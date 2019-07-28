const mongoose = require('mongoose');

const Schema = mongoose.Schema;



///    ไม่ได้ใช้

const partnerSchema = new Schema({

    idCard: {

        type: String,

    },

    firstname: {

        type: String,

    },

    lastname: {

        type: String,

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





const Partner = mongoose.model('MST_Partner', partnerSchema,'MST_Partner');

module.exports = Partner;