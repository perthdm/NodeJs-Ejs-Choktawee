const router = require('express').Router();
const repairController = require('../controllers/repairController');

//repairCustomer
router.route('/').get(repairController.repair);

//receiveCar
router.route('/receiveCar').get(repairController.receiveCar);
router.route('/addRepairOrder').post(repairController.addRepairOrder);
router.route('/repairDetail/:id').get(repairController.repairDetail);
router.route('/sucess/:id').get(repairController.sucess);
router.route('/del/:id').get(repairController.delOrder);
router.route('/insertOrder/:id').post(repairController.insertOrderItem);
module.exports = router;