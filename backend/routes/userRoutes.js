const { signup, login, logout, profileUpdate } = require("../controllers/userController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const singleUpload  = require("../middlewares/multer");

const router = require('express').Router();



router.post('/signup', singleUpload, signup);
router.post('/login', login);
router.get('/logout',logout);
router.post('/profileUpdate',isAuthenticated, singleUpload,profileUpdate);

module.exports = router;