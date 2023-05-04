const express = require("express")
const http = require("http")
const cors = require("cors")
const { Server } = require("socket.io")
const { connect } = require("./config/db")
const { userRoutes } = require("./routes/user.routes")

const app = express()
app.use(cors("*"))
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

app.get('/chat',(ask,give)=>{
    give.sendFile(__dirname+"/routes/chat.html")
})

const io = new Server(httpServer)

io.on("connection",(socket)=>{
    console.log("user connected");
    socket.on("chat",(msg)=>{
        console.log(msg)
        io.emit('chat',msg)
    })
})