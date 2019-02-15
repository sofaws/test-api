import {getWeather} from "./promocodes.services";
import AsyncAf from 'async-af';


/**
 * Constant that contains the different keys of possible restrictions.
 * The goal is to try to have a generic algorithm to add more easily
 */
const TYPE_RESTRICTIONS = {
    'or': async (restrictions, params) => await orIsValidate(restrictions, params),
    'and': async (restrictions, params) => await restrictionsIsValid(restrictions, params),
    'age': (restrictions, params) => ageValidator(params.age, restrictions),
    'date': (restrictions, params) => dateValidator(new Date(), restrictions),
    'meteo': async (restrictions, params) => await meteoValidator(restrictions, params),
};

/**
 * Check if the params of request are valid (compare with restrictions of promocode)
 * @param restrictions
 * @param params
 * @returns {Promise<Array>}
 */
export async function requestIsValid(restrictions, params) {
    return await restrictionsIsValid(restrictions, params);
}

/**
 * Check if params match ALL's restrictions or AND's restrictions
 * @param restrictions
 * @param params
 * @returns {Promise<Array>}
 */
async function restrictionsIsValid(restrictions, params) {
    let errors = [];
    await AsyncAf(restrictions).forEach(async field => {
        const value = await TYPE_RESTRICTIONS[field.restriction_name](field.restrictions, params);
        if (!value) errors.push({ type: field.restriction_name, restrictions: field.restrictions });
    });
    return errors;
}

/**
 * Check if params match OR's restrictions
 * @param restrictions
 * @param params
 * @returns {Promise<boolean>}
 */
async function orIsValidate(restrictions, params) {
    let isValid = false;
    await AsyncAf(restrictions).forEach(async field => {
        let valid = await TYPE_RESTRICTIONS[field.restriction_name](field.restrictions, params);
        if (valid) {
            isValid = true;
        }
    });
    return isValid;
}

/**
 * Check if params match age's restrictions
 * @param age
 * @param restriction
 * @returns {boolean}
 */
function ageValidator(age, restriction) {
    if (restriction.eq) {
        return age === restriction.eq
    } else {
        return age >= restriction.gt && age <= restriction.lt;
    }
}

/**
 * Check if params match date's restrictions
 * @param date
 * @param restriction
 * @returns {boolean}
 */
function dateValidator(date, restriction) {
    const now = date.getTime();
    const before = new Date(restriction.before).getTime();
    const after = new Date(restriction.after).getTime();
    return now >= after && now <= before;
}

/**
 * Check if params match meteo's restrictions
 * @param restrictions
 * @param params
 * @returns {Promise<boolean>}
 */
async function meteoValidator(restrictions, params) {
    if(!params.city || !restrictions.temp) return false;
    const {weather, main: {temp}} = await getWeather(params.city);
    let tempIsValid = restrictions.temp.eq ? temp === restrictions.temp.eq : temp >= restrictions.temp.eq || temp <= restrictions.temp.lt;
    const weatherIsValid = weather[0].main.toUpperCase() === restrictions.is.toUpperCase();
    return tempIsValid && weatherIsValid;
}

/**
 * Detect invalid keys in restriction array
 * @param restrictions
 * @returns {Array}
 */
export function isValidRestrictionsFormat(restrictions) {
    let errors = [];
    restrictions.forEach(field => {
        if(!Object.keys(TYPE_RESTRICTIONS).includes(field.restriction_name)) {
            errors.push({ field: field.restriction_name, message: 'this type doesn\'t exist' })
        }
        if(Array.isArray(field.restrictions)) errors = [ ...errors, ...isValidRestrictionsFormat(field.restrictions)];
    });
    return errors;
}
