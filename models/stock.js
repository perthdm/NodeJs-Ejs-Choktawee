const mongoose = require('mongoose');

const Schema = mongoose.Schema;



///    ไม่ได้ใช้

const stockSchema = new Schema({

    name: {

        type: String,

    },

    quantity: {

        type: Number,

    },

    spares: Schema.ObjectId

});





const Stock = mongoose.model('TRN_Stock',stockSchema,'TRN_Stock');

module.exports = Stock;