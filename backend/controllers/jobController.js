const companyModel = require("../models/companyModel");
const jobModel = require("../models/jobModel");

// CREATE JOB POST FROM RECRUITER
const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      role,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId
    } = req.body;

    console.log(req.body, companyId);

    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !role ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Fill required all job post fileds.",
        success: false,
      });
    }

    const companyExists = await companyModel.findById(companyId);
    if (!companyExists) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    console.log(companyExists);

    const job = new jobModel({
      title,
      description,
      requirements: requirements.toString().split(","),
      role,
      salary: Number(salary),
      location,
      jobType,
      experience,
      position,
      company: companyId,
      created_by: userId
    });
    console.log(job);

    await job.save();
    return res.status(201).json({
      message: "New job created successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
  }
  console.log(input);
};

//JOB SEARCHING BY STUDENTS
const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await jobModel.find(query).populate({
        path: "company",
      }).sort({ createdAt: -1 });
    if (!jobs) {
      return res
        .status(404)
        .json({ message: "Jobs not found", success: false });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.log(error.message);
  }
};
//STUDENTS
const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await jobModel.findById(jobId).populate({
      path: "applications"
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error.message);
  }
};

const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await jobModel
      .find({ created_by: adminId })
      .populate({path: "company"})
      .sort({ createdAt: -1 });

    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  postJob,
  getAllJobs,
  getJobById,
  getAdminJobs
};
