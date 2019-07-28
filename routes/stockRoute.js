const router = require('express').Router();
const stockController = require('../controllers/stockController');


// stockWage
router.route('/stockWage').get(stockController.stockWage);
router.route('/stockWage/delete/:_id').get(stockController.delstockWage);
router.route('/stockcar').get(stockController.stockcar);
router.route('/stockWage').post(stockController.addstockWage);
// stockWage


router.route('/').get(stockController.stock);
router.route('/delete/:_id').get(stockController.delStock);
router.route('/').post(stockController.addStock);
module.exports = router;