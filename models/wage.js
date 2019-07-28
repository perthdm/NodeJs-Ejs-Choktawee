const mongoose = require('mongoose');

const Schema = mongoose.Schema;




///    ไม่ได้ใช้
const wageSchema = new Schema({

    name: {

        type: String,

    },

    price: {

        type: Number,

    },



});





const Wage = mongoose.model('MST_Wage', wageSchema, 'MST_Wage');

module.exports = Wage