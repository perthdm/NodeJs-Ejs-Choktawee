const mongoose = require('mongoose');

const Schema = mongoose.Schema;



///    ไม่ได้ใช้

const sparesSchema = new Schema({

    name: {

        type: String,

    },

    price: {

        type: Number,

    },

    cost: {

        type: Number,

    },

    quantity: {

        type: Number,

    },



});





const Spares = mongoose.model('MST_Spares', sparesSchema, 'MST_Spares');

module.exports = Spares;