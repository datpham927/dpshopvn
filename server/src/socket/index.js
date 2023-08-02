const { Server } = require("socket.io")



const createSocket = (httpServer) => {
    let onlineUsers = [];

    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
        },
    });

    const addUser = (userId, socketId) => {
        if (!onlineUsers.some(user => user?.userId === userId)) {
            onlineUsers.push({ userId, socketId });
        }
    };

    const removeUser = (socketId) => {
        onlineUsers = onlineUsers.filter(user => user.socketId !== socketId);
    };

    const getUserByUserId = (userId) => {
        return onlineUsers.find(user => user.userId === userId);
    };

    io.on("connection", (socket) => {
        socket.on("addUser", (userId) => {
            if (userId) {
                addUser(userId, socket.id);
            }
            io.emit("getUser", onlineUsers);
        });

        socket.on("sendNotification", (data) => {
            const user = getUserByUserId(data.shopId);
            console.log("onlineUsers",onlineUsers)
            console.log("data",data.shopId)
            if (user) {
                socket.to(user.socketId).emit('getNotification', data, function (ack) {
                    if (ack) {
                        console.log('Tin nhắn đã được gửi thành công đến socket', user.socketId);
                        // Xử lý logic sau khi tin nhắn được gửi thành công
                    } else {
                        console.log('Gửi tin nhắn thất bại đến socket', user.socketId);
                        // Xử lý logic khi tin nhắn gửi thất bại
                    }
                });
            }
        });





        socket.on("disconnect", () => {
            removeUser(socket.id);
            io.emit("getUser", onlineUsers);
        });
    });
};

module.exports = createSocket;