const mongoose = require("mongoose");

const connect = mongoose.connect("mongodb+srv://harshil:X6iTVrwOZljcaZ16@cluster0.kc5rw.mongodb.net/E-Portofolio").then(()=>console.log("Connected to database successfully.")).catch((err)=>console.log("Error while connecting to database : "+err));

module.exports = connect;