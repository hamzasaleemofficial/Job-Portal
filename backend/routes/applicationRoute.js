

const {applyJob, getAppliedJobs, getApplicants, updateApplicationStatus} = require("../controllers/applicationController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = require('express').Router();

router.get('/applyJob/:id', isAuthenticated, applyJob);
router.get('/getAppliedJobs', isAuthenticated, getAppliedJobs);
router.get('/getApplicants/:id', isAuthenticated, getApplicants);
router.post('/updateApplicationStatus/:id',isAuthenticated, updateApplicationStatus);

module.exports = router;