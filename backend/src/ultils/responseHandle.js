const responseHandler = (res, statusCode, message, data, error) => {
    return res.status(statusCode).json({
        statusCode,
        message,
        success: statusCode >= 200 && statusCode < 300, // Tự động xác định success dựa vào statusCode
        data,
        error,
    });
};

export default responseHandler;
