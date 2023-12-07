const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema({});
const PackageModel = mongoose.model("Package", PackageSchema);
module.exports = PackageModel;