const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const carSchema = new Schema({
    brand:{ // ยี่ห้อ
        type: String
    },
    model:{ // รุ่น
        type: String
    },
    idTank:{ // เลขถัง
        type: String
    },
    idMotor:{ // เลขเครื่อง
        type: String
    },
    idCar:{ // เลขทะเบียน
        type: String
    },
    fuel:{ // เชื่อเพลิง
        type: String
    },
    color:{ // สี
        type: String
    },
    year:{ // รุ่นปี
        type: String
    },
    img:{ // รูป
        type: String
    },
    type:{
        type: String // เปิดขาย กับ ขายแล้ว
    },
    cost:{
        type: Number // ต้นทุน
    },
    price:{
        type: Number // ราคาขาย
    }

});


const Car = mongoose.model('MST_Car',carSchema , 'MST_Car');

module.exports = Car;