import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { USER } from '../model/user';

const usersRouter = Router();

usersRouter.get('/all',authMiddleware, async(request, response) => {
  const users = await USER.find();
  return response.json(users);
});

export default usersRouter;
