const TYPE_RESTRICTIONS = {
    'or': (restrictions, params) => orIsValidate(restrictions, params),
    'and': (restrictions, params) => restrictionsIsValidate(restrictions, params),
    'age': (restrictions, params) => ageValidator(params.age, restrictions),
    'date':(restrictions, params) => dateValidator(new Date(), restrictions),
    'meteo':(restrictions, params) =>  true,
};

export function askIsValidate(restrictions, params) {
    return restrictionsIsValidate(restrictions, params);
}

function restrictionsIsValidate(restrictions, params) {
    let valid = true;
    restrictions.forEach(field => {
        const value = TYPE_RESTRICTIONS[field.restriction_name](field.restrictions, params);
        if(!value) valid = false;
    });
    return valid;
}

function orIsValidate(restrictions, params) {
    let isValid = false;
    restrictions.forEach(field => {
        let valid = TYPE_RESTRICTIONS[field.restriction_name](field.restrictions, params);
        if(valid) {
            isValid = true;
        }
    });
    return isValid;
}

/**
 * todo
 * @param restrictions
 */
function restrictionsIsValid(restrictions) {
    Object.keys(restrictions).forEach(restriction => {
        if (!TYPE_RESTRICTIONS.includes(restriction)) return false;
    })

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

function meteoValidator() {

}
