import express  from 'express';
import {clerkWebhooks} from '../controllers/Usercontroller.js';

const userRouter = express.Router();

userRouter.post('/clerk/webhooks', express.json(), clerkWebhooks);

export default userRouter;