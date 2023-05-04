const mongoose = require("mongoose")

const schema = mongoose.Schema({
    username: String,
    chat:String
})

const ChatModel= mongoose.model('chats',schema)

module.exports={
    ChatModel
}