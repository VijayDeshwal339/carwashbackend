const mongoose = require("mongoose");
const serviceplanschema = new mongoose.Schema(
    {
        ServiceType:{ type:String, default: " "},
        Amount: { type: String, default: " "},

        CardContent:[
            {
                type:String ,
                default:"",
            },
        ],
    },
    { timestamps: true }
);
module.exports = mongoose.model("ServicePlan", serviceplanschema);
