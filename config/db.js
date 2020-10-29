const mongoose = require('mongoose');

//DB connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(`Database connected on ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    //Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
