const mongoose = require("mongoose");

const counter = new mongoose.Schema({
    name: {
        type: String,
        default: "Task Counter"
    },
    value: {
        type: Number,
        default: 0
    }
});

const Counter = mongoose.model("task_counter", counter);

module.exports = Counter;