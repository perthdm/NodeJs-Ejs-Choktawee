const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    type: {
        type: String,
    },
    date: {
        type: Date,
    },
    total: {
        type: Number,
    },
    detail: {
        type: String,
    },
    car: {
        type: Schema.Types.ObjectId,
        ref: "MST_Car"
    },
    partner: {
        type: Schema.Types.ObjectId,
        ref: "MST_Customer"
    },
    employee: {
        type: Schema.Types.ObjectId,
        ref: "MST_Customer"
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: "MST_Customer"
    },
    itemOrder: [{
        item: {
            type: Schema.Types.ObjectId,
            ref: "MST_Items"
        },
        price: {
            type: Number
        },
        quantity: {
            type: Number
        }
    }],
    renew: [[{ 
    }]],
});

orderSchema.plugin(require('mongoose-autopopulate'));
const Order = mongoose.model('TRN_Order', orderSchema, 'TRN_Order');

module.exports = Order;