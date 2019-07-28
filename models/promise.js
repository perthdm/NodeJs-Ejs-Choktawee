const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const promiseSchema = new Schema({

    date: {

        type: Date,

    },

    type:{

        type: String,

    },

    order : {

        type:Schema.Types.ObjectId,

        ref:"TRN_Order"

    }

});





const Promise = mongoose.model('TRN_Promise',promiseSchema,'TRN_Promise');

module.exports = Promise;