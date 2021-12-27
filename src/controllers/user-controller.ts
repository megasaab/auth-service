import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { authMiddleware } from '../middleware/auth';
import { AuthUser, User } from '../model/models';
import { USER } from '../model/user';
import { HelperClass } from '../helpers/helper';

const usersRouter = Router();

usersRouter.get('/all', authMiddleware, async (request, response) => {
  const users = await USER.find();
  return response.json(users);
});

usersRouter.get('/get-by-id/:id', authMiddleware, async (request, response) => {
  try {
    const user: AuthUser = await USER.findById(request.params.id);
    if (!user) throw ({ error: 'No user with this id found' });
    const result = HelperClass.convertUser(user);
    return response.status(StatusCodes.OK).json({ success: true, result });
  } catch (error) {
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: error })
  }
});



usersRouter.post('/remove-by-id', authMiddleware, async (request, response) => {
  try {
    const user: AuthUser = await USER.findByIdAndDelete(request.body.id);
    return response.status(StatusCodes.OK).json({ success: true});
  } catch (error) {
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: error })
  }
});


export default usersRouter;
