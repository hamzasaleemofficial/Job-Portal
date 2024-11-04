const {registerCompany, getCompany, getCompanyById, updateCompany} = require("../controllers/companyController");
const router = require('express').Router();



router.post('/registerCompany', registerCompany);
router.get('/getCompany', getCompany);
router.get('/getCompanyById/:id', getCompanyById);
router.put('/updateCompany/:id', updateCompany);

module.exports = router;