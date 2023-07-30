const { Server } = require("socket.io")

const socket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173"
        }
    })
    let userOnline = []
    const addUserNew = (userId, socketId) => {
        if (!userOnline.some(user => user?.userId === userId)) {
            userOnline.push({ userId, socketId })
        }
    }
    const remoteUser = (socketId) => {
        userOnline = userOnline.filter(user => user.socketId !== socketId)
    }
    // ------------------
    io.on("connection", (socket) => {
        socket.on("addUser", (userId) => {
            if (userId) {
                addUserNew(userId, socket.id)
            }
            io.emit("getUser", userOnline)
        })
        socket.on("disconnect", () => {
            remoteUser(socket.id)
            io.emit("getUser", userOnline)
        })
    })

}
module.exports = socket