const router = require('express').Router();
const customerController = require('../controllers/customerController');

//customer Hoa
router.route('/').get(customerController.index);

//addCustomer  Snack
router.route('/addCustomer').get(customerController.addCustomerPage);
router.route('/addCustomer').post(customerController.insertCustomer);

//editCutomer Plug
router.route('/edit/:_id').get(customerController.editCustomerPage);
router.route('/edit/submit').post(customerController.editCustomer);

//deleteCustomer Hoa
router.route('/delete/:_id').get(customerController.deleteCustomer);

//ViewCustomer Dome
router.route('/view/:_id').get(customerController.viewCustomer);
module.exports = router