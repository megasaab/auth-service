import { Router } from 'express';
import authRouter from '../controllers/auth-controller';
import usersRouter from '../controllers/user-controller';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/auth', authRouter);

export default routes;

