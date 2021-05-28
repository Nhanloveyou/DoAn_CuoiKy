const mongoose = require('mongoose')

async function connect(){
    try {
        await mongoose.connect('mongodb://localhost:27017/Web_nodejs_education', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
          });
          console.log('Connect Successfully'); 
    } catch (error) {
        console.log('failure'); 
    }
}

module.exports = {connect};
