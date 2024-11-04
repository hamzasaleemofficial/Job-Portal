const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel");
const getDataUri = require("../utils/datauri");
const cloudinary = require('../utils/cloudinary')



const signup = async (req, res) => {
  try {
    const { fullname, email, phoneNumber ,password, role } = req.body;
    

    if (!fullname || !email || !phoneNumber || !password || !role  ) {
      res
        .status(401)
        .json({ message: "Please fill all required fields", success: false });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        message: "User is already exist, you can't register",
        success: false,
      });
    }
    const user =  new userModel({fullname, email,phoneNumber ,password, role});
    user.password = await bcrypt.hash(password, 10);
    await user.save();
    return res
      .status(200)
      .json({ message: "Signup Successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      res
        .status(401)
        .json({ message: "Please fill all required fields", success: false });
    }
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "User is not registered",
        success: false,
      });
    }
    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      res.status(404).json({ message: errorMessage, success: false });
    }
    //check user role
    if (role != user.role) {
      res.status(401).json({
        message: "You don't have permission to access with this role",
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const jwtToken = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
      profile: user.profile,
    };
    return res
      .status(200)
      .cookie("token", jwtToken, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    res.statu(500).json({ message: "Internal Server Error", success: false });
  }
};

const logout = async (req, res) => {
  try {
    return res
      .statu(200)
      .cookie(token, "", { maxAge: 0 })
      .json({ message: "logout successfully", success: true });
  } catch (error) {
    res.statu(500).json({ message: "Internal Server Error", success: false });
  }
};

const profileUpdate = async (req, res) => {
  try {
    const { fullname, email, skills, phoneNumber, bio } = req.body;

    const file = req.file;
  // Cloudinary for resume upload
    const fileUri = getDataUri(file);
    console.log(cloudinary);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    
    let skillsArray;
    if (skills) {
      skillsArray = skills.toString().split(",");
    }
    const userId = req.id; //middleware authentication
    let user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    //updating data
    if (fullname) user.fullname = fullname
    if (email) user.email = email
    if (skills) user.profile.skills = skillsArray
    if (phoneNumber) user.phoneNumber = phoneNumber
    if (bio) user.profile.bio = bio

    if(cloudResponse){
      user.profile.resume = cloudResponse.secure_url; // save the cloudinary url
      user.profile.resumeOriginalName = file.originalname;  // Save the original file name
    }

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
      profile: user.profile,
    };

    res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  signup,
  login,
  logout,
  profileUpdate,
};
