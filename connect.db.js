const mongoose = require('mongoose')
module.exports = async function connectDB(){
  
    return  mongoose.connect(process.env.DB_URI,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      );
}