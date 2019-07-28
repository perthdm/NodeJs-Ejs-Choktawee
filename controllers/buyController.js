const Customer = require('../models/customer')
const Car = require('../models/car')
const Order = require('../models/order')
const Promises = require('../models/promise')
const Tax = require('../models/taxInvoice')
const Bill = require('../models/bill')

module.exports = {
    buyCar: async function (req, res) {
        Customer.find({}, await function (err, person) {
            res.render('page/buyCustomer', { result: person })
        })
    },

    uploadCar: async function (req, res) {
        console.log("----------- Car --------------");
        // console.log(req.body, req.file);
        const newCar = new Car({
            idCar: req.body.NoHidden,
            brand: req.body.BrandHidden,
            model: req.body.ModelHidden,
            fuel: req.body.FuelHidden,
            idTank: req.body.ChassisNoHidden,
            idMotor: req.body.EngineNoHidden,
            color: req.body.ColorHidden,
            year: req.body.YearHidden,
            type: "เปิดขาย",
            cost: req.body.PriceHidden,
            price: req.body.PriceSellHidden,
            img: req.file.filename
        })
        const CAR_SAVE = await newCar.save();
        console.log(CAR_SAVE);


        console.log("----------- Order --------------");
        const newOrder = new Order({
            type: "การซื้อ",
            date: new Date(),
            total: CAR_SAVE.cost,
            customer: req.body._idHidden,
            car: CAR_SAVE._id,
        })
        const ORDER_SAVE = await newOrder.save();
        console.log(ORDER_SAVE);


        console.log("------------ Promise -------------");
        const newPromise = new Promises({
            type: "การซื้อ",
            date: ORDER_SAVE.date,
            order: ORDER_SAVE._id
        })
        const PROMISE_SAVE = await newPromise.save();
        console.log(PROMISE_SAVE);



        console.log("------------ Bill -------------");
        const newBill = new Bill({
            type: "การซื้อ",
            date: ORDER_SAVE.date,
            total: CAR_SAVE.cost,
            order: ORDER_SAVE._id
        })
        const BILL_SAVE = await newBill.save();
        console.log(BILL_SAVE);

        console.log("------------ TAX -------------");
        const newTax = new Tax({
            type: "การซื้อ",
            date: ORDER_SAVE.date,
            total: CAR_SAVE.cost,
            vat: CAR_SAVE.cost * 0.07,
            order: ORDER_SAVE._id
        })
        const TAX_SAVE = await newTax.save();
        console.log(TAX_SAVE);
        res.redirect('/buy/sucess/' + ORDER_SAVE._id);
    },
    sucess : async function (req,res) {
        Order.findOne({_id: req.params.id}).populate('customer').populate('car').exec(function(err, data) {
            console.log(data);
            res.render('page/buySuccess' , {data : data});
        });
       
    },
    delOrder : async function (req,res){
        console.log("testttttt");
        
        Tax.findOne({ order : req.params.id }, function (err, taxInvoice) {
            taxInvoice.remove();
        });
        Bill.findOne({ order : req.params.id }, function (err, bill) {
            bill.remove();
        });
        Promises.findOne({ order : req.params.id }, function (err, promise) {
            promise.remove();
        });
      
        Order.deleteOne({ _id : req.params.id }, await function (err) {
            res.redirect('/report/service');
        });
    }
    

}
