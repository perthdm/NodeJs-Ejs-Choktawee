const router = require('express').Router();
const sellController = require('../controllers/sellController');

//sellCustomer
router.route('/').get(sellController.index);
router.route('/').post(sellController.addOrderSell);
router.route('/sucess/:id').get(sellController.sucess);
router.route('/del/:id').get(sellController.delOrder);
module.exports = router;

