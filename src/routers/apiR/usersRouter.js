import { Router } from 'express';
import { registerUser, getUserController, getCurrentUserController, putUserResetPasswordController, putUserUpdateByEmailController,getUsersByRolesController, deleteUserController, changeUserRole } from '../../controllers/apiR.controllers/usersRouter.controller.js';
import { passportLocalRegister, passportAuth } from '../../middlewares/passport.js';
import { adminsOnly, premiumOnly } from '../../middlewares/autorizar.js';
export const usersRouter = Router();



usersRouter.post('/', passportLocalRegister, registerUser);
usersRouter.get('/', passportAuth, getUserController);
usersRouter.put('/', passportAuth, putUserResetPasswordController);
usersRouter.put('/reset', passportAuth, putUserUpdateByEmailController);
usersRouter.get('/current', passportAuth, getCurrentUserController);
usersRouter.get('/roles', passportAuth, adminsOnly, getUsersByRolesController);
usersRouter.delete('/', passportAuth, deleteUserController);
usersRouter.put('/premium/:userId', passportAuth, premiumOnly, changeUserRole);

export default usersRouter;