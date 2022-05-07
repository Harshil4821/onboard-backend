const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
const mongoose = require("mongoose");
const User = require("./Schema/user_detail");
const Token = require("./Schema/token");
const bcrypt = require("bcrypt");
const checkCookie = require("./Middleware/check_cookie");
const jwt = require("jsonwebtoken");
const Connection = require("./Connection/index");
const cors = require("cors");
const PORT = process.env.PORT || 4000;

app.use(cors({
    // origin: ["http://localhost:3003", "https://onboard-harshil.web.app"],
    origin: "https://onboard-10.web.app",
    credentials: true
}))

app.post("/signup", require("./routers/SignUp/module"));

app.post("/login", require("./routers/Login/module"));

app.get("/user/me", checkCookie, require("./routers/Logged in User Details/module"));

app.get("/logout", checkCookie, require("./routers/Logout/module"));

app.post("/add/task", checkCookie, require("./routers/Add Card/module"));

app.get("/tasks", checkCookie, require("./routers/Get Tasks/module"));

app.post("/edit/task", checkCookie, require("./routers/Edit Task/module"));

app.post("/user", checkCookie, require("./routers/Get All User/module"));

app.post("/user/update", checkCookie, require("./routers/Update User/module"));

app.post("/add/company", require("./routers/Add Company/addCompany"));

app.get("/get/company", checkCookie, require("./routers/Get Company/module"));

app.get("/get/history", checkCookie, require("./routers/getHistoryTask/module"));

app.listen(PORT, (err)=>{
    if(err){
        console.log("Error while executing the code.");
    }
    else{
        console.log("Server is running on the port"+PORT);
    }
})



// {
//     "name": "Harshil Chudasama",
//     "email": "harshil1@gmail.com",
//     "phone": 9723032900,
//     "password": "harshil@123",
//     "confirm_password": "harshil@123"
// }