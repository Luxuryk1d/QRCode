const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OfficeSchema = new Schema({
    officeId: {
      type: String,
      required: true,
    },
    nameRu: {
        type: String,
        required: true,
    },
    nameKg: {
        type: String,
        required: true,
    },
    nameEn: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    manager: {
        type: String,
        required: true,
    },
    managerNum: {
      type: String,
      required: true,
    },
    managerMail: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        // required: true,
    },
    num: {
        type: String,
        required: true,
    },
});

const Offices = mongoose.model("office", OfficeSchema);
module.exports = Offices;