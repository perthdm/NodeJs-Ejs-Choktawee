const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    idCard: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    dateofbirth: {
        type: Date
    },
    tel: {
        type: String
    },
    address:{
        addressNumber:{
            type:String
        },
        street:{
            type:String
        },
        subdistrict:{
            type:String
        },
        district:{
            type:String
        },
        province:{
            type:String
        },
        zipCode:{
            type:String
        }
    }, 
    position: {
        type: String
    },
    salary: {
        type: Number

    },
    username: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    permission: {
        type: String,
    }
});

const Employee = mongoose.model('MST_Employee',employeeSchema,'MST_Employee');
module.exports = Employee;