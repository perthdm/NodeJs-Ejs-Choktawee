const Employee = require('../models/employee');
const Order = require('../models/order')
const Customer = require('../models/customer')
const Item = require('../models/items')

module.exports = {

    index: function (req, res) {
        console.log(req.session.login);
        
        res.render('page/login', { status: 0, message: "" });
    },

    login: function (req, res) {
        Employee.findOne({ username: req.body.username }, function (err, person) {
            if (person) {
                if (person.password == req.body.password) {
                    req.session.login = {
                        status: true,
                        obj: person,
                        type: person.position
                    }
                    
                    console.log(req.session.login);
                    res.redirect('/home');
                } else {
                    res.render('page/login', { status: 1, message: "รหัสผ่านไม่ถูกต้อง" });
                }
            } else {
                res.render('page/login', { status: 1, message: "ไม่มีผู้ใช้งานอยู่ในระบบ" });
            }
        });
    },

    forgetPasswordPage: function (req, res) {
        res.render('page/forgetpassword', { status: 0, message: "" });
    },

    forgetPassword: async function (req, res) {
        Employee.findOne({ username: req.body.username }, await function (err, person) {
            console.log(person);

            if (person) {
                if (req.body.newPassword == req.body.confirmPassword) {
                    if (person.email == person.email) {
                        person.password = req.body.newPassword

                        person.save((err) => {
                            res.render('page/forgetpassword', { status: 2, message: "เปลี่ยนรหัสผ่านสำเร็จ" })
                        })

                    } else {
                        res.render('page/forgetpassword', { status: 1, message: "ยืนยันอีเมลไม่ถูกต้อง" })
                    }
                } else {
                    res.render('page/forgetpassword', { status: 1, message: "ยืนยันรหัสผ่านใหม่ไม่ตรงกัน" })
                }
            } else {
                res.render('page/forgetpassword', { status: 1, message: "ไม่มีชื่อผู้ใช้งานอยู่ในระบบ" })
            }
        });
    },


    changePasswordPage: function (req, res) {
        res.render('page/changepassword', { status: 0, message: "" });
    },

    changepassword: function (req, res) {
        console.log(req.body.username)
        Employee.findOne({ username: req.body.username }, function (err, person) {

            if (person) {
                if (person.password == req.body.password) {
                    if (req.body.newPassword == req.body.confirmPassword) {

                        //Set New Password
                        person.password = req.body.newPassword
                        person.save((err, data) => {
                            res.render('page/changepassword', { status: 2, message: "เปลี่ยนรหัสผ่านสำเร็จ" });
                        });
                        //----------------

                    } else {
                        res.render('page/changepassword', { status: 1, message: "รหัสผ่านใหม่ไม่ตรงกัน" });
                    }
                } else {
                    res.render('page/changepassword', { status: 1, message: "รหัสผ่านเก่าไม่ถูกต้อง" });
                }

            } else {
                res.render('page/changepassword', { status: 1, message: "ไม่มีผู้ใช้งานอยู่ในระบบ" })
            }

        });
    },
    dashboard: async function (req, res) {
        var b = 0;
        var s = 0;
        var r = 0;
        var p = 0;
        var i = 0;
        var c = 0;
        var e = 0;
        var buy = await Order.aggregate([
            { $match: { type: "การซื้อ" } },
            { $group: { _id: null, total: { $sum: "$total" } } }
        ])
        if (buy[0]) b = buy[0].total;
        var sell = await Order.aggregate([
            { $match: { type: "การขาย" } },
            { $group: { _id: null, total: { $sum: "$total" } } }
        ])
        if (sell[0]) s = sell[0].total;
        var repair = await Order.aggregate([
            { $match: { type: "การซ่อม" } },
            { $group: { _id: null, total: { $sum: "$total" } } }
        ])
        if (repair[0]) r = repair[0].total;
        var pvr = await Order.aggregate([
            { $match: { type: "การต่อทะเบียน" } },
            { $group: { _id: null, total: { $sum: "$total" } } }
        ])
        if (pvr[0]) p = pvr[0].total;
        var item = await Item.aggregate([
            { $match: { doctype: "spares" } },
            { $group: { _id: null, total: { $sum: { $multiply: ["$cost", "$quantity"] } } } }
        ])
        if (item[0]) i = item[0].total;
        var allSell = i + b;
        var profit = s + r + p - allSell;
        var cus = await Customer.aggregate([
            { $group: { _id: null, count: { $sum: 1 } } }
        ])
        if (cus[0]) c = cus[0].count;
        var emp = await Employee.aggregate([
            { $group: { _id: null, count: { $sum: 1 } } }
        ])
        if (emp[0]) e = emp[0].count;
        res.render('page/dashboard', { b, s, r, p, i, allSell, profit, c, e })

    }

}