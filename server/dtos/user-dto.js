module.exports = class UserDto {
    id;
    User_nick;
    User_name;
    User_surname;
    roles;

    constructor (model){
        this.id = model._id;
        this.User_nick = model.User_name;
        this.User_name = model.User_name;
        this.User_surname = model.User_surname;
        this.roles = model.roles;
    }
}