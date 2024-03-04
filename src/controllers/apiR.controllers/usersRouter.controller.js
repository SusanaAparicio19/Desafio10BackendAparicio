import { usersServices } from '../../service/user.service.js';
import { appendJwtAsCookie } from '../autenticar.controller.js';

export async function registerUser(req, res, next) {
    try {
        await appendJwtAsCookie(req, res, next); 
        res.successfullPost(req.usuario);
        } catch (error) {
            next(error);
        }
    }


export async function getUserController(req, res, next) {
    req.logger.http('Estoy en el get de usuarios')
    try {
            if (req.params._id) {
                req.logger.verbose('recibi id: ' + req.params.id)
                res.json(await usersServices.findOneUser({ _id: req.params._id }))
            } else {
                req.logger.verbose('recibi query: ' + JSON.stringify(req.query))
                res.json(await usersServices.findManyUser(req.query))
            }
        } catch (error) {
            req.logger.error('fallo get usuarios. error: ' + error.message)
            next(error);
        }
    }



export async function putUserResetPasswordController(req, res, next) {
    try {
            const { email, newPassword } = req.body;   
            const updatedPassword = await usersServices.resetPassword(email, newPassword);
            if (!updatedPassword) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.json(updatedPassword);
        } catch (error) {
            next(error); 
        }
    }

export async function getUsersByRolesController(req, res, next) {
    try {
            const usersByRole = await usersServices.usersByRoles(req.query.roles);
            res.successfullGet(usersByRole);
        } catch (error) {
            next(error);
        }
    }
 
export async function putUserUpdateByEmailController(req, res, next) {
    try {
            const { email, newData } = req.body;   
            const updatedNewData = await usersServices.updateUserByEmail(email, newData);
            res.json(updatedNewData);
        } catch (error) {
            next(error); 
        }
    }


export async function getCurrentUserController(req, res, next) {
    try {
            const userCurrentEmail = req.session.user;
            const userCurrent = await usersServices.findUserByEmail(userCurrentEmail);
            res.json(userCurrent);
        } catch (error) {
            next(error);
        }
    }

export async function deleteUserController (req, res, next) {
    try {
            const userId = req.params.userId; 
            const deletedUser = await usersServices.deleteUserById(userId);
            res.json(deletedUser);
            
        } catch (error) {
            next(error);
        }
    }

export async function changeUserRole(req, res, next) {
    try {
        const userId = req.params.userId;
        const { role } = req.body; 
        const updatedUser = await usersServices.updateUserRole(userId, role);
        res.json(updatedUser);
     } catch (error) {
        next(error);
    }
}
    








