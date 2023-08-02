const express = require("express")
const http = require("http")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
require("dotenv").config()
const mongoose = require("mongoose")
const routes = require("./routes/index")
const createSocket = require("./socket/index")
const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(cookieParser()) //để có thể truyền được cookie
app.use(bodyParser.json());//để có thể truyền được chuỗi json
//để phân tích và trích xuất dữ liệu từ phần thân (body) của các yêu cầu HTTP có định dạng "x-www-form-urlencoded". Đây là một trong những loại dữ liệu phổ biến được sử dụng khi gửi dữ liệu từ một trang web HTML thông qua form.
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }))  
routes(app)
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("connected successfully!"))
    .catch(() => console.log("connection failed!"))


    //------------ socket ---------------
const Server = http.createServer(app)
createSocket(Server)
//-----------------------------------
    Server.listen(process.env.PORT, () => {
    console.log("Server is ready!")
})