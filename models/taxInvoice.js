const mongoose = require('mongoose');

const Schema = mongoose.Schema;





const taxinvoiceSchema = new Schema({

    date: {

        type: Date,

    },

    type:{

        type: String,

    },

    total: {

        type: Number,

    },

    vat: {

        type: Number,

    },

    order: {
        type: Schema.Types.ObjectId,
        ref: 'TRN_Order'
    }

});





const Taxinvoice = mongoose.model('TRN_TaxInvoice',taxinvoiceSchema,'TRN_TaxInvoice');

module.exports = Taxinvoice;