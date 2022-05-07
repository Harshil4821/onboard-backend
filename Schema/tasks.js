const mongoose = require("mongoose");

const tasks = new mongoose.Schema({
    company_id: {
        type: String
    },
    task_id: {
        type: Number
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    assigned: {
        type: Array
    },
    status: {
        type: String,
        required: true
    },
    attachment: {
        type: Array,
        required: false
    },
    dueDate: {
        type: Date,
        required: false,
    },
    checkList: {
        type: Array,
        required: false
    }
});

const Tasks = mongoose.model("tasks", tasks);

module.exports = Tasks;