const Employee = require('../models/employee');

module.exports = {
    index: function (req, res) {
        Employee.find().exec(function (err, person) {
            res.render('page/user', { result: person });
        });
    },

    addUserPage: function (req, res) {
        res.render('page/addUser');
    },

    insertUser: async function (req, res) {
        const newEmp = new Employee({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            permission: "user",
            idCard: req.body.idCard,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            tel: req.body.tel,
            address: {
                addressNumber: req.body.address,
                street: req.body.street,
                subdistrict: req.body.subdistrict,
                district: req.body.district,
                province: req.body.province,
                zipCode: req.body.zipCode
            },
            position: req.body.position,
            salary: req.body.salary
        })

        Employee.findOne({ idCard: req.body.idCard }, async function (err, person) {
            newEmp.save((err) => {
                if (err) { console.log(err) }
                res.redirect('/user');
            });
        })
    },

    viewUser: async function (req, res) {
        Employee.findOne({ _id: req.params._id }).exec(function (err, person) {
            // console.log(person)
            res.render('page/viewUser', { result: person });
        })
    },

    editUser: async function (req, res) {
        Employee.findOne({ _id: req.params._id }).exec(function (err, person) {
            console.log(person)
            res.render('page/editUser', { result: person });
        })
    },

    editUserSubmit: async function (req, res) {
        console.log(req.body.username);

        Employee.findOne({ username: req.body.username }, await function (err, person) {
            if (err) { console.log(err) }
            if (person) {
                person.email = req.body.email,
                    person.firstname = req.body.firstname,
                    person.lastname = req.body.lastname,
                    person.tel = req.body.tel,
                    person.address.addressNumber = req.body.address,
                    person.address.street = req.body.street,
                    person.address.subdistrict = req.body.subdistrict,
                    person.address.district = req.body.district,
                    person.address.province = req.body.province,
                    person.address.zipCode = req.body.zipCode,
                    person.position = req.body.position,
                    person.salary = req.body.salary

                person.save((err) => {
                    console.log(err);
                    res.redirect('/user')
                });
            }
        })
    }




}