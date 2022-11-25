const User = require('../models/usersModel');
const Role = require('../models/rolesModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userService = require('../service/user-service');
const bodyParser = require('body-parser');


const secret = process.env.SECRET_ACCESS




class authController {


    async registration(req, res, next) {
        try {
            const User_nick = req.body.User_nick.valueOf();
            const User_pass = req.body.User_pass.valueOf();
            const User_name = req.body.User_name.valueOf();
            const User_surname = req.body.User_surname.valueOf();

            const userData = userService.registration(User_nick, User_pass, User_name, User_surname);

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.status(200).json(userData);
        }
        catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const User_nick = req.body.User_nick;
            const User_pass = req.body.User_pass;
            const userData = await userService.login(User_nick, User_pass);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.status(200).json(userData);

        }
        catch (e) {
            next(e);
        }
    }

    async logout (req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            

            const token = await userService.logout();
            res.clearCookie('refreshToken');
            return res.status(200).json(token);
        }
        catch (e) {
            next(e);
        }
    }

    async refresh (req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.status(200).json(userData);
        }
        catch (e) {
            next(e)
        }
    }



    async getUsers(req, res, next) {
        try {
            const users = await userService.getUsers();
            return res.json(users)
        }
        catch (e) {
            next(e);
        }
    }

    async getRooms(req, res, next) {
        try{
            
        }
        catch (e) {
            next(e)
        }
    }
}

module.exports = new authController();