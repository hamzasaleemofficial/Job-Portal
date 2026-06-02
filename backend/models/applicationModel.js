const mongoose = require("mongoose");

// const Schema = mongoose.Schema;


const applicationSchema = new mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'job',
        required:true
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    status:{
        type:String,
        enum:['pending', 'accepted', 'rejected'],
        default:'pending'
    }
},{timestamps:true});
 const applicationModel  = mongoose.model("applications", applicationSchema);
 module.exports = applicationModel;