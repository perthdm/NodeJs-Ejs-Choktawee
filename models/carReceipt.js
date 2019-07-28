const mongoose = require('mongoose');

const Schema = mongoose.Schema;





const carReceiptSchema = new Schema({

    date: {

        type: Date,

    },

    dateAppointment:{

        type: Date,

    },

    order : {
        type: Schema.Types.ObjectId,
        ref: "TRN_Order"
    },
    type : {
        type : String
    }

});



const CarReceipt = mongoose.model('TRN_CarReceipt',carReceiptSchema,'TRN_CarReceipt');



module.exports = CarReceipt;