const companyModel = require("../models/companyModel");
const cloudinary = require("../utils/cloudinary");
const getDataUri = require("../utils/datauri");

const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName || typeof companyName !== "string") {
      return res
        .status(400)
        .json({ message: "Company name is required", success: false });
    }
    let company = await companyModel.findOne({ name: companyName });
    if (company) {
      return res
        .status(400)
        .json({ message: "Company already exist", success: false });
    }
    company = new companyModel({
      name: companyName,
      userId: req.id,
    });
    await company.save();
    return res.status(201).json({
      message: "Company registered successfully.",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
  }
};
// GET COMPANIES
const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await companyModel.find({ userId });
    if (!companies) {
      return res
        .status(400)
        .json({ message: "Companies not found", success: false });
    }
    return res.status(200).json({ companies, success: true });
  } catch (error) {
    console.log(error.message);
  }
};

//GET COMPANY BY ID
const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await companyModel.findById(companyId);
    if (!company) {
      return res
        .status(400)
        .json({ message: "Company not found", success: false });
    }
    return res.status(200).json({ company, success: true });
  } catch (error) {
    console.log(error.message);
  }
};

//UPDATE COMPANY
const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    const file = req.file;
    // Cloudinary for resume upload
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const logo = cloudResponse.secure_url;

    const updateData = { name, description, website, location, logo };
    console.log(updateData);

    const updateCompanyInfo = await companyModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!updateCompanyInfo) {
      return res
        .status(400)
        .json({ message: "Company not found", success: false });
    }
    return res
      .status(200)
      .json({
        message: "Company details have been updated",
        updateCompanyInfo,
        success: true,
      });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  registerCompany,
  getCompany,
  getCompanyById,
  updateCompany,
};
