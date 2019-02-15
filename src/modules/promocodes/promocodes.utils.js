import {getWeather} from "./promocodes.services";
import AsyncAf from 'async-af';

const TYPE_RESTRICTIONS = {
    'or': (restrictions, params) => orIsValidate(restrictions, params),
    'and': async (restrictions, params) => await restrictionsIsValidate(restrictions, params),
    'age': (restrictions, params) => ageValidator(params.age, restrictions),
    'date': (restrictions, params) => dateValidator(new Date(), restrictions),
    'meteo': async (restrictions, params) => await meteoValidator(restrictions, params),
};

export async function askIsValidate(restrictions, params) {
    return await restrictionsIsValidate(restrictions, params);
}

async function restrictionsIsValidate(restrictions, params) {
    let errors = [];
    await AsyncAf(restrictions).forEach(async field => {
        const value = await TYPE_RESTRICTIONS[field.restriction_name](field.restrictions, params);
        if (!value) errors.push({ type: field.restriction_name, restrictions: field.restrictions });
    });
    return errors;
}

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

function ageValidator(age, restriction) {
    if (restriction.eq) {
        return age === restriction.eq
    } else {
        return age >= restriction.gt && age <= restriction.lt;
    }
}

function dateValidator(date, restriction) {
    const now = date.getTime();
    const before = new Date(restriction.before).getTime();
    const after = new Date(restriction.after).getTime();
    return now >= after && now <= before;
}

async function meteoValidator(restrictions, params) {
    if(!params.city || !restrictions.temp) return false;
    const {weather, main: {temp}} = await getWeather(params.city);
    let tempIsValid = restrictions.temp.eq ? temp === restrictions.temp.eq : temp >= restrictions.temp.eq || temp <= restrictions.temp.lt;
    const weatherIsValid = weather[0].main.toUpperCase() === restrictions.is.toUpperCase();
    return tempIsValid && weatherIsValid;
}
