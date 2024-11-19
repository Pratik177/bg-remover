import express  from 'express';
import {clerkWebhooks, getUser} from '../controllers/Usercontroller.js';

const userRouter = express.Router();

userRouter.post('/clerk/webhooks', express.json(), clerkWebhooks);
userRouter.get('/:id', getUser);


export default userRouter;