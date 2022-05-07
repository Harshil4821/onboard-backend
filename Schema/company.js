const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
    company_name: {
        type: "String",
        required: true
    },
    company_address: {
        type: String
    },
    company_website: {
        type: String
    },
    company_contact_number: {
        type: String,
        required: true,
        unique: true
    },
    company_email_address: {
        type: String,
        required: true,
        unique: true
    },
    detailed_task_list: {
        type: Array,
        required: false
    }
});

const CompanyModel = mongoose.model("company_details", CompanySchema);

module.exports = CompanyModel;