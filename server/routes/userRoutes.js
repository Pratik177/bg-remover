import express  from 'express';
import {clerkWebhoooks} from '../controllers/Usercontroller.js';

const userRouter = express.Router();

userRouter.post('/webhooks', clerkWebhoooks);

export default userRouter;