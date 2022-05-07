const mongoose  = require("mongoose");

const User_Credential = new mongoose.Schema({
    company_id: {
        type: String,
        required: false
    },
    first_name: {
        required: true,
        type: String
    },
    last_name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        unique: true,
        type: String
    },
    phone: {
        required: true, 
        unique: true,
        minlength: 10,
        maxlength: 10,
        type: Number
    },
    password: {
        required: true,
        type: String
    },
    confirm_password: {
        required: true,
        type: String
    },
    admin: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model("user_details",User_Credential);

module.exports = User;