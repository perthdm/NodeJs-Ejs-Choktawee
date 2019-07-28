const mongoose = require('mongoose');

const Schema = mongoose.Schema;




///    ไม่ได้ใช้



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





const RenewelReceipt = mongoose.model('TRN_Receipt', renewelReceiptSchema, 'TRN_Receipt');





module.exports = RenewelReceipt;