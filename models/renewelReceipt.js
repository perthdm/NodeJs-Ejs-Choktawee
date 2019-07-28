const mongoose = require('mongoose');

const Schema = mongoose.Schema;







const renewelReceiptSchema = new Schema({
    date: {
        type: Date,
    },
    dateAppointment: {
        type: Date,
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: "TRN_Order"
    },
    type : {
        type : String
    }
});





const RenewelReceipt = mongoose.model('TRN_RenewelReceipt', renewelReceiptSchema, 'TRN_RenewelReceipt');





module.exports = RenewelReceipt;