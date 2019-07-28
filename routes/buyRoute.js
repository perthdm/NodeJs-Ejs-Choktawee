const router = require('express').Router();
const multer = require('multer')
const buyController = require('../controllers/buyController');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
const upload = multer({ storage })


router.route('/').get(buyController.buyCar);
router.route('/upload').post( upload.single('img') ,buyController.uploadCar);
router.route('/sucess/:id').get(buyController.sucess);
router.route('/del/:id').get(buyController.delOrder);

module.exports = router;

