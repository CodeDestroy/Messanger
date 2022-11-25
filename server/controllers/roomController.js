const User = require('../models/usersModel');
const Role = require('../models/rolesModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userService = require('../service/user-service');
const bodyParser = require('body-parser');
const roomsService = require('../service/rooms-service');


const secret = process.env.SECRET_ACCESS




class roomController {


    async createRoom(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            console.log(refreshToken)
            const userData = await userService.refresh(refreshToken);
            const users = req.body.Users;
            const roomName = req.body.roomName;
            const roomData = roomsService.createRoom(users, roomName)

            return res.status(200).json(roomData);
        }
        catch (e) {
            next(e);
        }
    }

    async addUsers(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            const Users_id = req.body.users.valueOf();

            const users = [];
            
            console.log(Users_id)
            return res.status(200)
            //.json(Users_id);
            /* const User_nick = req.body.User_nick;
            const User_pass = req.body.User_pass;
            const userData = await userService.login(User_nick, User_pass);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.status(200).json(userData); */

        }
        catch (e) {
            next(e);
        }
    }

    async deleteRoom (req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            const room = req.body.room.valueOf();

            await roomController.deleteRoom(room)

            return res.status(200).json(room)

            /* const User_nick = req.body.User_nick;
            const User_pass = req.body.User_pass;
            const userData = await userService.login(User_nick, User_pass);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.status(200).json(userData); */

        }
        catch (e) {
            next(e);
        }
    }

    async getRooms(req, res, next) {
        try {
            const user_id = req.body.User_id;
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            const user = await User.findById(user_id)
            const rooms = await roomsService.getRooms(user);
            return res.status(200).json(rooms)
        }
        catch (e) {
            console.log(e)
        }
    }

    async getUsersInRoom(req, res, next) {
        try {
            
            const {refreshToken} = req.cookies;
            const room_id = req.body.Room_id.valueOf();
            
            const userData = await userService.refresh(refreshToken);
            const users = await roomsService.getUsersInRoom(room_id);
            return res.status(200).json(users)
        }
        catch (e) {
            console.log(e)
        }
    }

    
}

module.exports = new roomController();