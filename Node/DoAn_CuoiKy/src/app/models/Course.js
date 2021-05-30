const mongoose = require('mongoose');
slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const Comment = require('../models/comment');




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
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    slug: { 
      type: String, 
      slug: "name", 
      unique: true 
    },
  },  {
    timestamps: true,
  });

  // Add plugins
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all'
});

module.exports = mongoose.model('Course', Course);
