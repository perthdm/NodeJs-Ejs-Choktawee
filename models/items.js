const mongoose = require('mongoose');

const Schema = mongoose.Schema;





const itemsSchema = new Schema({

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

    doctype: {

        type: String,
        required: true,

    }



});





const Items = mongoose.model('MST_Items', itemsSchema, 'MST_Items');

module.exports = Items;