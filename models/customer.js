const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    idCard: {
        type: String,
        unique : true
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    birthday : {
        type: Date
    },
    email: {
        type: String,
    },
    tel: {
        type: String,
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
        },
    }

});


const Customer = mongoose.model('MST_Customer',customerSchema,'MST_Customer');
module.exports = Customer;