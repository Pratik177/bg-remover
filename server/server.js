import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB  from './config/mongodb.js';   // Correct default import
import userRouter from './routes/userRoutes.js'; // Correct default import
dotenv.config();
const app = express();
await connectDB();



//initialize middleware as middleware
app.use(express.json());
app.use(cors());

const PORT = 3000;

//API routes
app.get('/', (req, res) => {
    res.send('API is running...123');
});
app.use('/api/user', userRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  
});
