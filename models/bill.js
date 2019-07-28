const mongoose = require('mongoose');

const Schema = mongoose.Schema;





const billSchema = new Schema({

    date: {

        type: Date,

    },

    type: { //ประเภท(การซื้อ , การขาย , การซ่อม , การเดินทะเบียน)

        type: String,

    },

    total: {

        type: Number,

    },

    payee: {

        type: String,

    },

    status: { //ประเภทการออกบิล(ใบเสร็จ , ใบกำกับภาษี)
        type: String
    },

    order: {
        type: Schema.Types.ObjectId,
        ref: 'TRN_Order'
    }

});





const Bill = mongoose.model('TRN_Bill', billSchema, 'TRN_Bill');

module.exports = Bill;