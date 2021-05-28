const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        maxLength: 255,
        unique: true
      },
    
    email:{
        type: String,
        minLength: 3,
        maxLength: 255,
        required: true
    },

    password:{
        type: String,
        minLength: 6,
        maxLength: 255,
        required: true
    },
    exp:{
        type:Number,
    },
    img: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        default: 'basic'
    }
},{
    timestamps: true,
});

userSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);  
};
  
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);  
};

module.exports = mongoose.model('User', userSchema);