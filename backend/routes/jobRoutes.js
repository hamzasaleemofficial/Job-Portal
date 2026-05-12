const {postJob,getAllJobs, getJobById, getAdminJobs } = require("../controllers/jobController");
const isAuthenticated = require("../middlewares/isAuthenticated");

const router = require("express").Router();

router.post('/postjobs',isAuthenticated, postJob);
router.get('/getAllJobs',isAuthenticated, getAllJobs),
router.get('/getJobById/:id',isAuthenticated, getJobById),
router.get('/getAdminJobs',isAuthenticated, getAdminJobs);

module.exports = router;