const express = require("express")
const http = require("http")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
require("dotenv").config()
const mongoose = require("mongoose")
const routes = require("./routes/index")
const createSocket = require("./socket/index")
const compression = require("compression")
const { default: helmet } = require("helmet")
const app = express()

//init middlewares
app.use(cors({
    origin: ["http://localhost:3000","http://localhost:5173", "http://192.168.1.13:5173",process.env.URL_CLIENT],
    credentials: true,
}));
app.use(cookieParser()) //để có thể truyền được cookie
app.use(compression()) // để giảm size của tệp tin hoặc dữ liệu trước khi chuyển gửi qua mạng. Tối ưu hóa tốc độ truyền dữ liệu và giảm băng thông mạng cần thiết.
app.use(helmet()) // bảo vệ ứng dụng khỏi các cuộc tấn công bảo mật thông qua việc thiết lập các HTTP headers liên quan đến bảo mật.
app.use(bodyParser.json());//để có thể truyền được chuỗi json
//để phân tích và trích xuất dữ liệu từ phần thân (body) của các yêu cầu HTTP có định dạng "x-www-form-urlencoded". Đây là một trong những loại dữ liệu phổ biến được sử dụng khi gửi dữ liệu từ một trang web HTML thông qua form.
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }))
// init router 
routes(app) 
setInterval(async () => { 
        console.error('Run' ); 
}, 2 * 60 * 1000); // 5 phút
// init database
require("./dbs/init.mongodb")
//------------ socket ---------------
const Server = http.createServer(app)
createSocket(Server)
//-----------------------------------
Server.listen(process.env.PORT, () => {
    console.log("Server is ready!")
})
