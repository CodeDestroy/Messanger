const User = require('../models/usersModel');
const Role = require('../models/rolesModel');
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const bcrypt = require('bcryptjs')
const ApiError = require('../exeptions/api-error');
const { default: roomsModel } = require('../models/roomsModel');
const Room = require('../models/roomsModel');
const { JsonWebTokenError } = require('jsonwebtoken');
const jwt = require('jsonwebtoken')

class RoomService {
    /* async registration (User_nick, User_pass, User_name, User_surname) {
        try {
            const candidate = await User.findOne({User_nick})
            console.log('Регистрация')
            if (candidate) {
                
                throw ApiError.BadRequest(`Пользователь ${User_nick} уже существует`)
            }
            const pass_to_hash = User_pass.valueOf();
            const hashPassword = bcrypt.hashSync(pass_to_hash, 8);
            
            const nick = User_nick;
            const name = User_name;
            const surname = User_surname;
            
            const user = await User.create({User_nick: nick, User_pass: hashPassword, User_name: name, User_surname: surname, roles: "USER"}); 

            const userDto = new UserDto(user); //id, role
            
            const tokens = tokenService.generateTokens({...userDto});
            await tokenService.saveToken(userDto.id, tokens.refreshToken);
            
            return { ...tokens, user: userDto }
        }
        catch (e) {
            console.log(e)
        }
        
    }


    async login(nick, pass) {
        try {
            const user = await User.findOne({User_nick: nick});
            if (!user) {
                throw ApiError.BadRequest(`Пользователь ${nick} не найден`)
            }
            const isPassEquals = await bcrypt.compare(pass, user.User_pass);
            if (!isPassEquals) {
                throw ApiError.BadRequest(`Пароль неверный`)
            }
            const userDto = new UserDto(user); //id, role
            const tokens = tokenService.generateTokens({...userDto});
            
            await tokenService.saveToken(userDto.id, tokens.refreshToken);
            
            return { ...tokens, user: userDto }
        }
        catch (e) {
            console.log(e)
        }
        
    }

    

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    

    async getUsers() {
        const users = await User.find();
        return users;
    } */

    async getRooms(user) {
        
        try {
            const users = await User.findOne(user);
            const rooms = await Room.find({usersId: users});
            return rooms;
        }
        catch (e) {
            console.log(e)
        }
        
    }

    async getUsersInRoom(room_id) {
        try {
            let loading = true;
            const room = await Room.findById(room_id)
            const ids = room.usersId;
            const users = await User.find().where('_id').in(ids);
            return users;        
        }
        catch (e) {
            console.log(e)
        }
        
    }


    async createRoom (users_ids, roomName) {
        try {
            const users = await User.find().where('_id').in(users_ids);
            console.log(users.length)
            //const findedUser = User.findById(user._id)
            const isDialog = (users.length > 2 ? false: true)
            const room = await Room.create({usersId: users, roomName, isDialog}); 
            return { room }
        }
        catch (e) {
            console.log(e)
        }
    }

    async addUsers(room, usersNicks) {
        try {

            const roomCandidate = await roomsModel.findOne(room);
            if (!roomCandidate) {
                throw new ApiError.BadRequest(`Комната ${room} не найдена`)
            }
            const users = [];

            usersNicks.forEach(async User_nick => {
                let findedUser = await User.findOne({User_nick});
                if (!findedUser) {
                    throw new ApiError.BadRequest(`Пользователь ${findedUser} не найден`)
                }                
                users.push(findedUser)
            });
            const dialog = false;
            if (users.length > 1) {
                dialog = true;
            }
            await roomCandidate.update({usersId: users, isDialog: dialog});
        }
        catch (e) {
            console.log(e)
        }
    }

    async deleteRoom (room) {
        try {
            const roomCandidate = await Room.findOne(room);
            if (!roomCandidate) {
                throw new ApiError.BadRequest(`Комната ${room} не найдена`)
            }
            await Room.findOneAndDelete(room);
        }   
        catch (e) {
            console.log(e)
        }
    }
}


    

module.exports = new RoomService();