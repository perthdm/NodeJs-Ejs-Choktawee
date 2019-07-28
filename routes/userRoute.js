const router = require('express').Router();

const userController = require('../controllers/userController');



//U
router.route('/').get(userController.index);
router.route('/addUser').get(userController.addUserPage);

//Kung
router.route('/insertUser').post(userController.insertUser);

//editUser
router.route('/edit/:_id').get(userController.editUser);
router.route('/edit/submit').post(userController.editUserSubmit);

// //deleteUser
// router.route('/delete/:_id').get(userController.deleteUser);

//ViewUser
router.route('/view/:_id').get(userController.viewUser);


module.exports = router;

