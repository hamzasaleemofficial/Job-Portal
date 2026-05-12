const {registerCompany, getCompany, getCompanyById, updateCompany} = require("../controllers/companyController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const singleUpload = require("../middlewares/multer");
const router = require('express').Router();



router.post('/registerCompany',isAuthenticated, registerCompany);
router.get('/getCompany',isAuthenticated, getCompany);
router.get('/getCompanyById/:id',isAuthenticated, getCompanyById);
router.put('/updateCompany/:id',isAuthenticated,singleUpload ,updateCompany);

module.exports = router;