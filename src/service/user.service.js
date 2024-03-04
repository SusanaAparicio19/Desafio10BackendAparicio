
import { userRepository } from '../repository/user.repository.js';
import { hashear, hasheadasSonIguales } from '../utils/cripto.js';


class UserService {
    async createUser(userData) {
        try {
      
            userData.password = hashear(userData.password)
            const createUser = await userRepository.createUser(userData);
            return createUser;
        } catch (error) {
            throw new Error('Error al crear usuario');
        }
    }
    
    async findOneUser(req, res) {
        const user = req.session.user_id;
    
        try {
            const userFound = await userRepository.findOneUser(user._id );
            return res.successfullGet(userFound);
        } catch (error) {
            return res.failedGet();
        }
    }

        
    async findUserByEmail(email) {
        try {
            const usuario = await userRepository.findUserByEmail(email);
            if (!usuario) { 
                throw new Error('authentication error');
            }
    
            /* Verificar si las contraseñas coinciden
            if (!hasheadasSonIguales(password, usuario.password)) {
                throw new Error('authentication error');
            }*/
    
            
            return usuario;
    
        } catch (error) {
            throw new Error('Error finding user by email');
        }
    }
    
      
    async findManyUser(req, res) {
        const query = req.session.query;
    
        try {
            const usersFound = await userRepository.findManyUser(query )
            return res.successfullGet(usersFound);
        } catch (error) {
            return res.failedGet();
        }
    }


    async resetPassword(email, newPassword) {
        try {
            
            const hashedPassword = hashear(newPassword);
            const updatedUser = await userRepository.resetPassword(email, hashedPassword);
    
            if (!updatedUser) {
                throw new Error('Usuario no encontrado');
            }
    
            return updatedUser;
        } catch (error) {
            throw new Error('Error al restablecer la contraseña del usuario');
        }
    }
    
       async usersByRoles(roles) {
        try {
            const usersByRole = await userRepository.usersByRoles(roles);
            const plainUsers = usersByRole.map(usuario => ({
                email: usuario.email,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                
            }));
            return plainUsers;
        } catch (error) {
            throw error;
        }
    }
    
    
    async updateUserByEmail(email, newData) {
        try {
            const updatedUser = await userRepository.updateUserByEmail(email, { $set: { newData } });
            if (!updatedUser) {
            throw new Error('Usuario no encontrado')}
            return updatedUser;
        } catch (error) {
            throw new Error('Error al modificar los datos del usuario');
        }
    }


    async userCurrent (_id) {
        try {
            const user = await userRepository.findOneUser(_id);
            if (user) {
                return {//@ts-ignore
                    _id: user._id,
                    email: user.email,
                };
            } else {
                throw new Error('Usuario no encontrado');
            }
        } catch (error) {
            throw new Error('Error al obtener el usuario actual');
        }
    }
    
    
    async deleteUserById(userId) {
        try {
            const deletedUser = await userRepository.deleteUserById(userId);
            if (deletedUser) {
                return { status: 200, message: 'Usuario eliminado exitosamente' }; 
            } else {
                return { status: 404, message: 'El usuario no pudo ser encontrado' }; 
            }
        } catch (error) {
            return { status: 500, message: 'Error al eliminar usuario en el servicio: ' + error.message }; 
        }
    }
    
    
    async updateUserRole(userId, newRole) {
        try {
            const updatedUser = await userRepository.updateUserRole(userId, newRole);
            return updatedUser;
        } catch (error) {
            throw error;
        }
    }

    
}

export const usersServices = new UserService()