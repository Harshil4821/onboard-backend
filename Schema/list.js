const mongoose = require("mongoose");

const DetailedTaskList = new mongoose.Schema({
    company_id: {
        type: String,
        required: true
    },
    list_name: {
        type: String,
        required: true
    },
    no_of_cards_in_list: {
        type: Array,
        required: false
    }
});

const ListDetailModel = mongoose.model("list_detail_model", DetailedTaskList);

module.exports = ListDetailModel;