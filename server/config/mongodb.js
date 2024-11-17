import mongoose from 'mongoose';

const connectDB = async () => {
    try {
         await mongoose.connect(process.env.MONGO_URI);
         console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Failed to connect to MongoDB:', error);

        throw error; // Re-throw to handle in the calling file
    }
};

// Default export
export default connectDB;
