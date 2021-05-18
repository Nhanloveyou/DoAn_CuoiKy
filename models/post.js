const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Populate = require("../util/autopopulate");
const User = require('../models/user');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const PostSchema = new Schema(
  {
    _id: { type: Number },
    title: { type: String, required: true },
    url: { type: String, required: true },
    summary: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    author : [{ type: Schema.Types.ObjectId, ref: "User", required: true }]
  },
  {
    _id: false,
    timestamps: true,
  }
);

//Add plugin
PostSchema.plugin(AutoIncrement);

module.exports = mongoose.model("Post", PostSchema);