const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_ACCESS
const tokenService = require('../service/token-service')
const ApiError = require('../exeptions/api-error')
module.exports = function(req, res, next) {
    if (req.method === "OPTIONS"){
        next();
    }

    try {
        const token = req.headers.authorization;
        if (!token)
            return next(ApiError.UnauthorizedError());
        const accessToken = req.headers.authorization.split(' ')[1];
        if (!accessToken)
            return next(ApiError.UnauthorizedError());
        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }
        req.user = userData;
        next();
    }
    catch (e) {
        return next(ApiError.UnauthorizedError());
    }
        

}