const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const User = new Schema({
    name: {
        type: String,
        maxLength: 255,
        required: true,
        unique: true
      },
    exp:{
        type:Number,
    }
});
module.exports = mongoose.model('User', User);