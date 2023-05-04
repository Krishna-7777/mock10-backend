const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
const { connect } = require("./config/db")
const { userRoutes } = require("./routes/user.routes")

const app = express()

app.use(express.json())

const httpServer = http.createServer(app)

httpServer.listen(4000, () => {
    try {
        connect
        console.log("Connected to the DB & Server is running at 4000...");
    } catch (error) {
        console.log("Error in connecting to the DB!");
    }
})

app.get('/', (ask, give) => {
    give.send("Chat-Application Backend")
})

app.use('/user', userRoutes)

const io = new Server(httpServer)
