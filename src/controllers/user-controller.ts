import { Router } from 'express';
import { USER } from '../model/user';

const usersRouter = Router();

usersRouter.get('/all', async(request, response) => {
  const users = await USER.find();
  return response.json(users);
});

export default usersRouter;
