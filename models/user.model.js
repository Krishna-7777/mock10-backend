const mongoose = require("mongoose")

const schema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
})

const UserModel= mongoose.model('users',schema)

module.exports={
    UserModel
}