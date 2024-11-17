import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB  from './config/mongodb.js'; // Correct default import

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    });
