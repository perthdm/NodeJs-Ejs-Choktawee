const router = require('express').Router();

const renewController = require('../controllers/renewController');



router.route('/').get(renewController.index);
router.route('/').post(renewController.addRenewOrder);
router.route('/sucess/:id').get(renewController.sucess);
router.route('/del/:id').get(renewController.delOrder);


module.exports = router;

