const jwt = require('jsonwebtoken');
require('dotenv').config()
const secretAccess = process.env.SECRET_ACCESS
const secretRefresh = process.env.SECRET_REFRESH

const tokenModel = require('../models/tokenModel')


class TokenService {

    generateTokens(payload) {
        const accessToken = jwt.sign(payload, secretAccess, {expiresIn: "30m"})
        const refreshToken = jwt.sign(payload, secretRefresh, {expiresIn: "30d"})
        return {
            accessToken,
            refreshToken,
        }
    }


    validateAccessToken (token) {
        try {
            const userData = jwt.verify(token, secretAccess);
            return userData
        }
        catch(e) {
            return null;
        }
    }


    
    validateRefreshToken (token) {
        try {
            const userData = jwt.verify(token, secretRefresh);
            return userData
        }
        catch(e) {
            return console.log(e);
        }
    }

    async saveToken (userId, refreshToken) {
        const tokenData = await tokenModel.findOne({user: userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenModel.create({user: userId, refreshToken});
        return token;
    }

    async removeToken (refreshToken) {
        const tokenData = tokenModel.deleteOne(refreshToken);
        return tokenData;
    }

    async findToken (refreshToken) {
        const tokenData = tokenModel.findOne({refreshToken});
        return tokenData;
    }

}

module.exports = new TokenService();