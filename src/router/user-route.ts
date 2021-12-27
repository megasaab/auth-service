import { Router } from 'express';

const usersRouter = Router();

usersRouter.get('/all', (request, response) => {
  return response.json("OK");
});

export default usersRouter;
