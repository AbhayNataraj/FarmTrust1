const mongoose = require('mongoose');


const connectDB = async () => {
  try {
    mongoose.connect("mongodb+srv://abhay:1234@test.ceqtnd4.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.set('strictQuery',false)
    console.log('Database connection successful');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
