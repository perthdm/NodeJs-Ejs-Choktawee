// const Receipt = require('../models/receipt');
const Order = require('../models/order');
const RenewReceipt = require('../models/receipt')
const CarReceipt = require('../models/carReceipt')
const Customer = require('../models/customer')
const Car = require('../models/car')
const PromiseReceipt = require('../models/promise')
const Bill = require('../models/bill');
const TaxInvoice = require('../models/taxInvoice')

module.exports = {
    reportBill: function(req, res) {
        Bill.find().populate({ path: 'order', populate: { path: 'customer', model: 'MST_Customer' } }).exec(function(err, result) {
            // console.log(result);

            res.render('page/reportBill', { result: result });
        });
    },

    bill: function(req, res) {
        Bill.findOne({ order : req.params._id }).populate({ path: 'order', populate: [{ path: 'car', model: 'MST_Car' },{ path: 'customer', model: 'MST_Customer' }, { path: 'itemOrder.item', model: 'MST_Items' }] }).exec(function(err, result) {
            if (err) console.log(err);
            // console.log("result in bill" + result);
            res.render('page/bill', { result: result });
        });
    },

    vat: function(req, res) {
        TaxInvoice.findOne({ order : req.params._id }).populate({ path: 'order', populate: [{ path: 'car', model: 'MST_Car' },{ path: 'customer', model: 'MST_Customer' }, { path: 'itemOrder.item', model: 'MST_Items' }] }).exec(function(err, result) {
            if (err) console.log(err);
            // console.log("result in bill" + result);
            res.render('page/vat',{result : result});
        });
    },

    showPromise: function(req, res) {
        PromiseReceipt.findOne({ order : req.params._id }).populate({ path: 'order', populate: [{ path: 'customer', model: 'MST_Customer' }, { path: 'car', model: 'MST_Car' }] }).exec(function(err, person) {
            console.log(person);
            res.render('page/promisecar', { result: person });
        });
    },



    //Jojo
    recieve: async function(req, res) {
        var  renew =  await RenewReceipt.find().populate({ path: 'order', populate: { path: 'customer'}}).exec();
        res.render('page/reportRenew', { result: renew});
    },

    //Perth
    promise: function(req, res) {
        PromiseReceipt.find().populate({ path: 'order', populate: { path: 'customer', model: 'MST_Customer' } }).exec(function(err, person) {
            res.render('page/reportPromise', { result: person })
        });
    },


    renewReceipt: async function(req, res) {
        RenewReceipt.findOne({ order : req.params._id }).populate({ path: 'order', populate: [{ path: 'customer', model: 'MST_Customer' }] }).exec(function(err, person) {
            res.render('page/renewReceipt', { result: person });
        })
    },



    carReceipt: async function(req, res) {
        CarReceipt.findOne({ order : req.params._id}).populate({ path: 'order', populate: [{ path: 'customer', model: 'MST_Customer' }, { path: 'car', model: 'MST_Car' }] }).exec(function(err, person) {
            // console.log(person)
            res.render('page/receiveCar', { result: person });
        })
    },



    orderTable: async function(req, res) {
        Order.find().populate('customer').populate('car').populate('employee').exec(function(err, person) {
            // console.log(person[0].customer.firstname);
            res.render('page/service', { person });
        });
    }





}