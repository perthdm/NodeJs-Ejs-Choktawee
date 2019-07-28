const router = require('express').Router();

const reportController = require('../controllers/reportController');



//reportBill

router.route('/reportBill').get(reportController.reportBill);

//Bill
router.route('/bill/:_id').get(reportController.bill);

//Vat
router.route('/vat/:_id').get(reportController.vat);

//reportRenew Jojo

router.route('/recieve').get(reportController.recieve);



//reportPromise Perth

router.route('/promise').get(reportController.promise);



//renewReceipt

router.route('/renewReceipt/:_id').get(reportController.renewReceipt);



//receiveCar

router.route('/carReceipt/:_id').get(reportController.carReceipt);



//Promise

router.route('/showpromise/:_id').get(reportController.showPromise);



//OrderTable (Tab3)

router.route('/service').get(reportController.orderTable);



module.exports = router;

