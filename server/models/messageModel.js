const mongoose = require('mongoose');
const schema = mongoose.Schema;

const messageSchema = new mongoose.Schema(
  {
    messageId: {
      type: String,
      required: true,
      unique: true
    },
    /* messageType: {
      type: String,
      required: true
    }, */
    textOrPathToFile: {
      type: String,
      required: true
    },
    roomId: {
      type: String,
      required: true,
      ref: 'Room'
    },
    userId: {
      type: String,
      required: true,
      ref: 'User'
    },
  },
  {
    timestamps: true
  }
)


const Message = mongoose.model('Message', messageSchema);

module.exports = Message;

