const applicationModel = require("../models/applicationModel");
const jobModel = require("../models/jobModel");

const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required",
        success: false,
      });
    }

    // check if the user already applied for this job
    const existingApplication = await applicationModel.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this Job",
        success: false,
      });
    }
    // check if the job exists
    const job = await jobModel.findById(jobId);
    if (!job) {
      return res.status(400).json({
        message: "JOB NOT FOUND",
        success: false,
      });
    }
    // create new application
    const newApplication = await applicationModel.create({
      applicant: userId,
      job: jobId,
    });

    job.applications.push(newApplication._id);
    await job.save();
    return res.status(200).json({
      message: "job applied successfully",
      success: true,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const applications = await applicationModel
      .find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!applications) {
      return res.json(400).json({
        message: "No Applications Found",
        success: false,
      });
    }

    return res.status(200).json({
      applications,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = jobModel.find({ job: jobId }).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      return res.status(400).josn({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const updateJobStatus = async (req, res) => {
  try {
    const status = req.body;
    if (!status) {
      return res.status(400).json({
        message: "status is required",
        success: false,
      });
    }
    const applicationId = req.param.id;
    const application = await applicationModel.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
        success: false,
      });
    }
    //update application status
    application.status = status.toLowerCase();
    await application.save();
    return res.status(200).json({
        message: "Job Application status updated successfully",
        success: true
    })
  } catch (error) {
    console.log(error.message);
  }
};
