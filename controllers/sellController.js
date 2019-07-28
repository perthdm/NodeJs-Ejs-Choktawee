const Car = require('../models/car')
const Customer = require('../models/customer');
const Order = require('../models/order')
const Bill = require('../models/bill')
const Promise = require('../models/promise')
const TaxInvoice = require('../models/taxInvoice')
module.exports = {

    index:async function (req, res) {
        var customer = await Customer.find({});
        Car.find({type:"เปิดขาย"},await function(err,car){
           res.render('page/sellCustomer',{ car : car ,result : customer});
        })        
    },
    addOrderSell : async function(req,res){
        var car = await Car.findOne({_id : req.body.idCar });
        car.type = "ขายแล้ว";
        car.save();

        var newOrder = new Order({
            type : "การขาย",
            date : new Date(),
            total : car.price,
            car : car._id,
            customer : req.body.idCustomer,
        });

        newOrder.save((err,data)=>{
            var bill = new Bill({
                type : "การขาย",
                date : data.date,
                total : data.total,
                order  : data._id,
            });
            bill.save();

            var promise = new Promise({
                type : "การขาย",
                date : data.date,
                order  : data._id,
            });
            promise.save();

            var taxInvoice = new TaxInvoice({
                type : "การขาย",
                date : data.date,
                total : data.total,
                vat : data.total * 0.07,
                order  : data._id,
            });
            taxInvoice.save();
            res.redirect('sell/sucess/' + data._id);
        });
    },
    sucess : async function (req,res) {
        Order.findOne({_id: req.params.id}).populate('customer').populate('car').exec(function(err, data) {
            console.log(data);
            res.render('page/sellSuccess' , {data : data});
        });
       
    },
    delOrder : async function (req,res){
        TaxInvoice.findOne({ order : req.params.id }, function (err, taxInvoice) {
            taxInvoice.remove();
        });
        Bill.findOne({ order : req.params.id }, function (err, bill) {
            bill.remove();
        });
        Promise.findOne({ order : req.params.id }, function (err, promise) {
            promise.remove();
        });
      
        Order.deleteOne({ _id : req.params.id }, await function (err) {
            res.redirect('/report/service');
        });
    },
    

    

}