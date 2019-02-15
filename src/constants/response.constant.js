export const ErrorResponse = (err) => {
    return {
        success: false,
        err,
    }
};

export const SuccessResponse = (data) => {
    return {
        success: true,
        data
    }
};
