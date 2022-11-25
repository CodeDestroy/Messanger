const mongoose = require('mongoose');
const schema = mongoose.Schema;


const roomSchema = new mongoose.Schema(
  {
    usersId: [{type: schema.Types.ObjectId, required: true, ref: 'User'}],
    roomName : {
      type: String,
      required: true,
    },
    isDialog: {
        type: Boolean,
        required: true,
    },
    
  },
  {
    timestamps: true
  }
)

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;



