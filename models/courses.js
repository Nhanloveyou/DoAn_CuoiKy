const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const commentSchema = new Schema({
	rating:{
		type: Number,
		min: 1,
		max: 5,
		required: true
	},
	comment: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	}
},{
	timestamps: true
}

);

const Course = new Schema({
    name: {
      type: String,
      maxLength: 200,
      required: true,
      unique: true
    },
    title:{
      type: String, 
      maxLength: 500,
      required: true
    },
    description: {
      type: String, 
      maxLength: 10000,
      required: true
    },
    videoID: {
      type: String, 
      maxLength: 200
    },
    level: {
      type: String, 
      maxLength: 200
    },
    image: {
      type: String, 
	  maxLength: 200
    },
    price:{
      type:Number,
      required: true
    },
	comments: [commentSchema]
  },  {
    timestamps: true,
  });

module.exports = mongoose.model('Course', Course);