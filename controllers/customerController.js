const Customer = require('../models/customer')

module.exports = {

    //Hoa
    index: async function (req, res) {
        Customer.find({}, await function (err, person) {
            res.render('page/customer', { result: person });
        });
    },

     //Snack
    addCustomerPage: function (req, res) {
        res.render('page/addCustomer');
    },

     //Dome
    viewCustomer: async function (req, res){
        Customer.findOne({_id : req.params._id},await function(err,customer){
            res.render('page/viewCustomer', { result: customer });
        })
    },

     //Plug
    editCustomerPage: async function (req, res) {
        Customer.findOne({_id : req.params._id}, await function(err,customer){
            res.render('page/editCustomer', { result: customer });
        });
    },

    //Snack
    insertCustomer: async function (req, res) {
        const newCustomer = new Customer({
            idCard: req.body.idCard,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            birthday: req.body.birthday,
            email: req.body.email,
            tel: req.body.tel,
            address: {
                addressNumber: req.body.addressNumber,
                street: req.body.street,
                subdistrict: req.body.subdistrict,
                district: req.body.district,
                province: req.body.province,
                zipCode: req.body.zipCode,
            }
        });

        Customer.findOne({ idCard: req.body.idCard }, await function (err, person) {
            if (person) {
                console.log("มีลูกค้าคนนี้อยู่แล้ว");
                res.redirect('/customer');
            } else {
                newCustomer.save((err) => {
                    if (err) { console.log(err) }
                    res.redirect('/customer');
                });
            }
        });
    },

    //Plug
    editCustomer:async function(req,res) {

        Customer.findOne({idCard : req.body.idCard}, await function(err , customer){
            customer.firstname = req.body.firstname,
            customer.lastname = req.body.lastname,
            customer.birthday = req.body.birthday,
            customer.email = req.body.email,
            customer.tel = req.body.tel,
            customer.address.addressNumber  =  req.body.addressNumber,
            customer.address.street  =  req.body.street,
            customer.address.subdistrict  =  req.body.subdistrict,
            customer.address.district  =  req.body.district,
            customer.address.province  =  req.body.province,
            customer.address.zipCode  =  req.body.zipCode,

            customer.save((err,data)=>{
                console.log(data);
                res.redirect('/customer');
            });
        });
    },

    //hoa
    deleteCustomer: async function (req, res) {
        Customer.findOne({ _id: req.params._id }, await function (err, customer) {
            customer.remove();
            res.redirect('/customer');
        });
    }
}



