const mongoose = require('mongoose');
slug = require('mongoose-slug-generator');


mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Course = new Schema({
    name: {
      type: String,
      maxLength: 255,
      required: true,
      unique: true
    },
    description: {
      type: String, 
      maxLength: 1000,
      required: true
    },
    style:{
      type: String,
      maxLength: 255
    },
    // price:{
    //   type:Number,
    //   maxLength: 100,

    // },
    videoID: {
      type: String, 
      maxLength: 255
    },
    level: {
      type: String, 
      maxLength: 255
    },
    image: {
      type: String, maxLength: 255
    },
    comment:{
      type: String, maxLength: 255
    },
    slug: { 
      type: String, 
      slug: "name", 
      unique: true 
    },
  },  {
    timestamps: true,
  });

module.exports = mongoose.model('Course', Course);
