const router = require('express').Router();
const loginController = require('../controllers/loginController');

//Namtan
router.route('/').get(loginController.index);
router.route('/').post(loginController.login);

//Boat
router.route('/changepassword').get(loginController.changePasswordPage);
router.route('/changepassword').post(loginController.changepassword);

router.route('/forgetpassword').get(loginController.forgetPasswordPage);
router.route('/forgerpassword').post(loginController.forgetPassword);

router.route('/dashboard').get(loginController.dashboard);
module.exports = router;

