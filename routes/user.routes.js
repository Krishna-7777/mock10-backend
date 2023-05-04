const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const { UserModel } = require("../models/user.model")

const userRoutes = express.Router()

userRoutes.post('/register', async (ask, give) => {
    try {
        let payload = ask.body
        let userSearch = await UserModel.find({ email: payload.email })
        if (!userSearch.length) {
            let pass = payload.password
            let hash = await bcrypt.hash(pass, 2)
            payload.password = hash
            let user = new UserModel(payload)
            await user.save()
            give.send({ msg: "You are Succesfully Registered" })
        } else {
            give.send({ msg: "You are already Registered!" })
        }
    } catch (error) {
        console.log(error);
        give.send({ msg: "Error" })
    }
})

userRoutes.patch('/verify/:email', async (ask, give) => {
    try {
        await UserModel.findOneAndUpdate({ email: ask.params.email }, { verified: true })
        give.status(204).send()
    } catch (error) {
        console.log(error);
        give.send({ msg: "Error" })
    }
})

userRoutes.post('/login', async (ask, give) => {
    try {
        let payload = ask.body
        let user = await UserModel.find({ email: payload.email })
        if (user.length) {
            user=user[0]
                let res = await bcrypt.compare(payload.password, user.password)
                if (res) {
                    let token = await jwt.sign({ id: user._id }, process.env.secret)
                    give.send({ msg: "Login Successfull", token })
                } else {
                    give.send({ msg: "Wrong Credentials!" })
                }
        }else{
            give.send({msg:"Please Register First"})
        }
    } catch (error) {
        console.log(error);
        give.send({ msg: "Error" })
    }
})

module.exports = {
    userRoutes
}