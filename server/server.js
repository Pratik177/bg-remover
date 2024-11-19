import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB  from './config/mongodb.js'; // Correct default import

dotenv.config();
const app = express();
await connectDB();

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PATCH,POST,PUT,DELETE",
    credentials: true,
}


//initialize middleware
app.use(express.json());
app.use(cors(corsOptions));

const PORT = 3000;

//API routes
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  
});
