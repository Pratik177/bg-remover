import express  from 'express';
import {clerkWebhoooks} from '../controllers/Usercontroller.js';

const userRouter = express.Router();

userRouter.post('/clerk/webhooks', express.json(), clerkWebhoooks);

export default userRouter;