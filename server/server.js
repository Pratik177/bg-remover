import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB  from './config/mongodb.js'; // Correct default import
import userRouter from './routes/userRoutes.js';

dotenv.config();
const app = express();

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PATCH,POST,PUT,DELETE",
    credentials: true,
}


app.use(cors(corsOptions));
app.use(express.json());

const PORT = 3000;

//API routes
app.get('/', (req, res) => {
    res.send('API is running...12  345');
});
app.use('/api/user', userRouter); // Correct import

await connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    });
