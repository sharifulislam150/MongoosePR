const mongoose = require("mongoose"); 

const chatSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  msg: {
    type: String,
    maxLength: 50
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true
  }
});

const Chat = mongoose.model("Chat",chatSchema)

module.exports = Chat;


// const chatSchema = new mongoose.Schema({
//     message: {
//         type: String,
//         required: true
//     },
//     sender: {
//         type: String,
//         required: true
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// const Chat = mongoose.model("Chat", chatSchema);

// module.exports = Chat;