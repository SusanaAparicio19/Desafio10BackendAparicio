import { Router } from 'express'
import { loginUser, getCurrentSessionUser,logoutUser } from '../../controllers/apiR.controllers/sessionsRouter.controller.js';
import { appendJwtAsCookie, removeJwtFromCookies } from '../../controllers/autenticar.controller.js';
import { passportLogin, sessionAuth } from '../../middlewares/passport.js'


export const sessionsRouter = Router()

sessionsRouter.post('/', 
    passportLogin,
    appendJwtAsCookie,
    loginUser
);


sessionsRouter.get('/current', 
    sessionAuth,
    getCurrentSessionUser
);


sessionsRouter.delete('/current',
    removeJwtFromCookies,
    logoutUser
);