const mongoose = require("mongoose");

const GetQuoteSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        
    },
    message: {
        type: String
    }
});

const GetQuoteModel = new mongoose.model("quote", GetQuoteSchema);

module.exports = GetQuoteModel;