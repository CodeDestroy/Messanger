const User = require('../models/usersModel');
const Role = require('../models/rolesModel');
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const bcrypt = require('bcryptjs')
const ApiError = require('../exeptions/api-error');


class UserService {
    async registration (User_nick, User_pass, User_name, User_surname) {
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

    async refresh(refreshToken) {
        if (!refreshToken){
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }


        const user = await User.findById(userData.id)
        const userDto = new UserDto(user); //id, role
        const tokens = tokenService.generateTokens({...userDto});
        
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        
        return { ...tokens, user: userDto }

    }

    async getUsers() {
        const users = await User.find();
        return users;
    }

    
}


    

module.exports = new UserService();