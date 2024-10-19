const express = require('express');
const path = require("path");
const cookieParser = require('cookie-parser');


const db = require('./config/database');
const Router = require('./routers/index');
const fileUpload = require('express-fileupload');


// Khởi tạo ứng dụng Express
const app = express();

// Connect to database
db.getConnection();
const PORT = process.env.PORT || 4000;

// Middleware 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());
app.use(express.json());

// Router
app.get('/hello', (req, res) => {
    res.send('Chào mừng đến với API!');
});

app.use("/api/v1", Router);


// Gửi lại lỗi 404 cho bất kỳ yêu cầu api nào không xác định
app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
      res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
      res.json({ message: "404 Not Found" });
    } else {
      res.type("txt").send("404 Not Found");
    }
  });

// Bắt đầu server
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
