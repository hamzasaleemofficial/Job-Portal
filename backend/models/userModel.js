
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    package: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ['student', 'recruiter']
    },
    profile: {
        bio:{type: String},
        skills:[{type: String}],
        resume:{type: String},  //URL to resume file
        resumeOriginalName:{type: String},
        company:{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Company'
        },
        profilePhoto:{
            type: String,
            default: ""
        }
    },
    
},  {timestamps: true});

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;

