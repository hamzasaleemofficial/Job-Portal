const jobModel = require("../models/jobModel");

// CREATE JOB POST FROM RECRUITER
const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
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

    const job = await jobModel.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      message: "New job created successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
  }
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
      path: "applications",
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.log(error.message);
  }
};

const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const adminJobs = await jobModel
      .findById({ createdBy: adminId })
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!adminJobs) {
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
