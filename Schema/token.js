const mongoose  = require("mongoose");

const token = new mongoose.Schema({
    email: {
        type: String, 
        required: true
    },
    token: {
        type: String, 
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

const Token = mongoose.model("tokens",token);

module.exports = Token;