module.exports = class RoomDto {
    id;
    roomName;
    usersId;
    isDialog;
    constructor (model){
        this.id = model._id;
        this.roomName = model.roomName;
        this.usersId = model.usersId;
        this.isDialog = model.isDialog;
    }
}