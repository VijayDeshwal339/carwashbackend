const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            require: true,
        },
        lastname: {
            type: String,
            require: true,
        },
        email: {
            type: String,
        },
        contactnumber: {
            type: Number,
        },
        alternatenumber: {
            type: Number,
        },
        message: {
            type: String,
        },
        mesaagetitle: {
            type: String,
        },
    },
    { timestamps: true }
);
const ContactModel = mongoose.model("contact", ContactSchema);
module.exports = ContactModel;