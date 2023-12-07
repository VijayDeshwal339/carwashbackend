const mongoose = require("mongoose");

const ServicerequestSchema = new mongoose.Schema(
    {
        firstname:{
            type:String,
            default: "",
        },
        lastname:{
            type:String,
            default:"",
        },
        email: {
            type: String,
            default: " ",
        },
        contactnumber: {
            type: Number,
            default: " ",
        },
        alternatenumber: {
            type: Number,
            default: " ",
        },
        payementMode: {
            type: Number,
            default: "COD",
        },
        serviceat: {
            type: String,
            default: " ",
        },

        PickUp_location: {
            locality: { type: String, trim: true, default: " " },
            city: { type: String, trim: true, default: " " },
            district: { type: String, trim: true, default: " " },
            state: { type: String, trim: true, default: " " },
            pincode: { type: Number, default: " " },
        },

        status: {
            type: Number,
            default: " ",
          },
    },
    { timestamps: true }
);

const ServiceModel = mongoose.model("Service", ServicerequestSchema);
module.exports = ServiceModel;