const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const companySchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
      set: (value) => value.trim() //automatically trim white spaces
    },
    description: {
      type: String,
    },
    website: {
      type: String,
    },
    location: {
      type: String,
    },
    logo: {
      type: String, // URL to company logo
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { timestamps: true }
);

const companyModel = mongoose.model('company', companySchema);
module.exports = companyModel;
