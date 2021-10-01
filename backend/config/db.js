import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    let mongoURI = '';
    if (process.env.NODE_ENV === 'test') {
      mongoURI = process.env.MONGO_URI_TEST;
    } else {
      mongoURI = process.env.MONGO_URI;
    }

    const conn = await mongoose.connect(mongoURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
  }
};

export default connectDB;
