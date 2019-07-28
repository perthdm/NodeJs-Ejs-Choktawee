const Customer = require('../models/customer')
const Order = require('../models/order')
const RenewelReceipt = require('../models/receipt')
const Bill = require('../models/bill')
const TaxInvoice = require('../models/taxInvoice')
module.exports = {



    index: async function (req, res) {
        Customer.find({}, await function (err, person) {
            res.render('page/renewCustomer', { result: person })
        })

    },
    addRenewOrder: async function (req, res) {
        // console.log(req.body.data);
        console.log("test");

        var NUM = req.body.data.item.length
        var Total = NUM * 50;
        var newOrder = new Order({
            type: "การต่อทะเบียน",
            date: new Date(),
            customer: req.body.data.customer,
            renew: req.body.data.item,
            total: Total
        });


        newOrder.save((err, data) => {
            if (err) { console.log(err) }
            var newReceipt = new RenewelReceipt({
                date: new Date(),
                dateAppointment: req.body.data.date,
                order: data._id
            })
            newReceipt.save()
            var bill = new Bill({
                type: "การต่อทะเบียน",
                date: data.date,
                total: data.total,
                order: data._id,
            });
            bill.save();
            var taxInvoice = new TaxInvoice({
                type: "การต่อทะเบียน",
                date: data.date,
                total: data.total,
                vat: data.total * 0.07,
                order: data._id,
            });
            taxInvoice.save((err) => {
                 res.send(data);
            });
            
           

        });
    },
    sucess: async function (req, res) {
        Order.findOne({ _id: req.params.id }).populate('customer').exec(function (err, data) {
            console.log(data);
            res.render('page/renewSuccess', { data: data });
        });

    },

    delOrder: async function (req, res) {
        TaxInvoice.findOne({ order : req.params.id }, function (err, taxInvoice) {
            taxInvoice.remove();
        });
        Bill.findOne({ order : req.params.id }, function (err, bill) {
            bill.remove();
        });
        RenewelReceipt.findOne({ order : req.params.id }, function (err, renew) {
            renew.remove();
        });
        Order.deleteOne({ _id : req.params.id }, await function (err) {
            res.redirect('/report/service');
        });
    }
}