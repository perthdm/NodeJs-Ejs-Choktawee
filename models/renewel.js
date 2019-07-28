const mongoose = require("mongoose");

const Schema = mongoose.Schema;
///    ไม่ได้ใช้
const renewelSchema = new Schema({
  No: {
    type: Stringฆ
  },

  dateRenewelStart: {
    type: Date
  },

  dateRenewelEnd: {
    type: Date
  },

  price: {
    type: Number
  },

  brand: {
    type: String
  },

  color: {
    type: String
  },

  year: {
    type: String
  },

  fuel: {
    type: String
  },

  gear: {
    type: String
  },

  mile: {
    type: String
  },

  engineNo: {
    type: String
  },

  chassisNo: {
    type: String
  },

  picture: {
    type: String
  }
});

const Renewel = mongoose.model("MST_Renewel", renewelSchema, "MST_Renewel");

module.exports = Renewel;
