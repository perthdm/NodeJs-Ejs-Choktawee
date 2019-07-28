const Items = require('../models/items');
const Car = require('../models/car');


module.exports = {
    stock: async function (req, res) {
        Items.find({ doctype: 'spares' }, await function (err, result) {
            console.log(result)
            res.render('page/stock', { result: result });
        })
    },

    stockcar: async function(req, res) {
        Car.find({$or:[{type:"เปิดขาย"},{type:"ขายแล้ว"}]}, await
            function(err, result) {
                console.log(result)
                res.render('page/car', { result: result });
            })


    },
    
    stockWage: async function (req, res) {
        Items.find({ doctype: 'wage' }, await
            function (err, result) {
                // console.log(result);
                res.render('page/stockWage', { result: result });
            })

    },
    addstockWage: function (req, res) {
        var newWage = new Items({
            name: req.body.name,
            doctype: "wage",
            price: req.body.price
        })

        newWage.save((err, data) => {
            // console.log(data);
            res.redirect('/stock/stockWage');
        });

    },
    delstockWage: async function (req, res) {
        console.log(req.params._id);
        Items.findOne({ _id: req.params._id }, function (err, result) {
            result.remove();
            res.redirect('/stock/stockWage');
        })



    },

    addStock: function (req, res) {
        var newSpares = new Items({
            name: req.body.name,
            price: req.body.price,
            cost: req.body.cost,
            doctype: "spares",
            quantity: req.body.quantity
        })

        newSpares.save((err, data) => {
            // console.log(data);
            res.redirect('/stock');
        });

    },
    delStock: async function (req, res) {

        Items.findOne({ _id: req.params._id }, function (err, result) {
            result.remove();
            res.redirect('/stock');
        })



    },






}