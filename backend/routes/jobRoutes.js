const {postJob,getAllJobs, getJobById, getAdminJobs } = require("../controllers/jobController");

const router = require("express").Router();

router.post('/postjobs', postJob);
router.get('/getAllJobs', getAllJobs),
router.get('/getJobById/:id', getJobById),
router.get('/getAdminJobs', getAdminJobs);

module.exports = router;