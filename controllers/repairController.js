const Customer = require('../models/customer');
const Order = require('../models/order');
const Car = require('../models/car')
const Item = require('../models/items')
const Tax = require('../models/taxInvoice')
const Bill = require('../models/bill')
const CarReceipt = require('../models/carReceipt')
module.exports = {

    repair: async function (req, res) {
        Customer.find({}, await
            function (err, person) {
                // console.log(person);
                res.render('page/repairCustomer', { result: person });
            });
    },

    repairDetail: async function (req, res) {
        var item = await Item.find();
        Order.findOne({ _id: req.params.id }).populate('customer').populate('car').populate('employee').populate('itemOrder.item').exec(function (err, person) {
            console.log(person);
            res.render('page/repairDetail', { person, item });
        });


    },

    receiveCar: function (req, res) {
        res.render('page/receiveCar')
    },

    addRepairOrder: async function (req, res) {
        var car = new Car({
            type: "ซ่อม",
            idCar: req.body.no,
            brand: req.body.brand,
            model: req.body.model,
            color: req.body.color,
            year: req.body.year,
            fuel: req.body.fuel,
            idTank: req.body.engineNo,
            idMotor: req.body.chassisNo,
        });
        car.save((err, data) => {
            if (err) { console.log(err) }
            var newOrder = new Order({
                type: "การซ่อม",
                date: new Date(),
                detail: req.body.detail,
                car: data._id,
                total: 0,
                customer: req.body._id
            })

            newOrder.save((err, DataOder) => {
                if (err) { console.log(err) }
                var bill = new Bill({
                    type: "การซ่อม",
                    date: DataOder.date,
                    total: DataOder.total,
                    order: DataOder._id,
                });
                bill.save();

                var carReceipt = new CarReceipt({
                    type: "การซ่อม",
                    date: DataOder.date,
                    order: DataOder._id,
                });
                carReceipt.save();

                var taxInvoice = new Tax({
                    type: "การซ่อม",
                    date: DataOder.date,
                    total: DataOder.total,
                    vat: DataOder.total * 0.07,
                    order: DataOder._id,
                });
                taxInvoice.save();
                res.redirect('/repair/sucess/' + DataOder._id);
            });

        });

    },

    insertOrderItem: async function (req, res) {
       
        console.log(req.body);
        var ArrayItem = []
        var sum = 0
        var order = await Order.findOne({ _id: req.params.id }).populate('customer').populate('car').populate('employee');
        var tax = await Tax.findOne({ order: req.params.id });
        var bill = await Bill.findOne({ order: req.params.id });
       
            for (var i = 0; i < req.body.idItem.length; i++) {
                ArrayItem.push({
                    item: req.body.idItem[i],
                    price: req.body.price[i],
                    quantity: req.body.quantity[i]

                });
                sum += parseInt(req.body.price[i]) * parseInt(req.body.quantity[i]);
            }
       

  
  
        tax.total = sum;
        tax.vat = sum * 0.07;
        tax.save();
        bill.total = sum;
        bill.save();
        order.itemOrder = ArrayItem;
        order.total = sum;
        order.save();
     
        res.redirect('/repair/sucess/' + order._id);


    },

    sucess: async function (req, res) {
        Order.findOne({ _id: req.params.id }).populate('customer').populate('itemOrder.item').exec(function (err, data) {
            console.log(data);
            res.render('page/repairSuccess', { data: data });
        });

    },
    delOrder: async function (req, res) {
        Tax.findOne({ order: req.params.id }, function (err, taxInvoice) {
            taxInvoice.remove();
        });
        Bill.findOne({ order: req.params.id }, function (err, bill) {
            bill.remove();
        });
        CarReceipt.findOne({ order: req.params.id }, function (err, promise) {
            promise.remove();
        });

        Order.deleteOne({ _id: req.params.id }, await function (err) {
            res.redirect('/report/service');
        });
    }

}