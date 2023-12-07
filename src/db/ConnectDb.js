const mongoose = require("mongoose");

const Connectdb = () => {
    return mongoose.connect(process.env.DB_URL)
    .then((data) => {
        console.log("mongodb connected");
    })
    .catch((err) => {
        console.error(err);
    });
};

module.exports = Connectdb;