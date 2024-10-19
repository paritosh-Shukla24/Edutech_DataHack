import mongoose from 'mongoose';

const mongoURI = 'mongodb+srv://spamm:spam@datahack.0upmb.mongodb.net/?retryWrites=true&w=majority&appName=DataHack'; // Replace with your connection string

async function testConnection() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully!');
    mongoose.disconnect();
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
}

testConnection();
