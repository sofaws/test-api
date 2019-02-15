export const ValidAskResponse = (promocode, avantage) => {
    return {
        promocode_name: promocode,
        status: "accepted",
        avantage
    }
};

export const NotValidAskResponse = (promocode, reasons) => {
    return {
        promocode_name: promocode,
        status: "denied",
        reasons
    }
};
