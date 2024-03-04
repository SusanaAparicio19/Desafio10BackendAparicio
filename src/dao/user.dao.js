import { UserModel } from '../models/User.model.js';


class UserDao {
    async createUser(userData) {
        try {
            return await UserModel.create(userData);
        } catch (error) {
            throw new Error('Error al crear usuario en la base de datos');
        }
    }

    async findOneUser(_id) {
        try {
            const userFound = await UserModel.findOne({ _id }).lean();
            return userFound;
        } catch (error) {
            throw new Error('Error al buscar usuario en la base de datos');
        }
    }

    async findUserByEmail({ email, password }) {
        try {
            const user = await UserModel.findOne({ email, password }).lean();
            return user;
        } catch (error) {
            throw new Error('Error al buscar usuario en la base de datos');
        }
    }

    async findManyUser(query) {
        try {
            const usersFound = await UserModel.find({ query }).lean();
            return usersFound;
        } catch (error) {
            throw new Error('Error al buscar usuario en la base de datos');
        }
    }

    
async resetPassword(email, newPassword) {
    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            throw new Error('No se encontró el usuario con el correo electrónico proporcionado');
        }

        await user.resetPassword(newPassword);

        
        return user;
    } catch (error) {
        throw new Error('Error al restablecer la contraseña del usuario');
    }
}

    async usersByRoles(roles) {
        try {
            const usersByRole = await UserModel.find({ rol: { $in: roles } }).lean();
            return usersByRole;
        } catch (error) {
            throw new Error('Error al obtener usuarios por roles de la base de datos');
        }
    }

    async updateUserByEmail(email, newData) {
        try {
            const updatedUser = await UserModel.findOneAndUpdate({ email }, newData, { new: true });
            if (!updatedUser) {
                throw new Error('No se encontró ningún usuario con el correo electrónico proporcionado');
            }
            return updatedUser.toObject();
        } catch (error) {
            throw new Error('Error al actualizar usuario por email en la base de datos');
        }
    }
    
    
    async userCurrent(_id) {
        try {
            const userFound = await UserModel.findOne({ _id });
            if (!userFound) {
                throw new Error('No se encontró ningún usuario con el ID proporcionado');
            }
            return userFound.toObject();
        } catch (error) {
            throw error;
        }
    }
    
    
    async deleteUserById(_id) {
        try {
            const deletedUser = await UserModel.findOneAndDelete({ _id });
            if (!deletedUser) {
                throw new Error('No se encontró ningún usuario con el ID proporcionado');
            }
            return deletedUser.toObject();
        } catch (error) {
            throw new Error('Error al eliminar usuario por ID en la base de datos');
        }
    }
    
    
    async updateUserRole(userId, newRole) {
        try {
            const updatedUser = await UserModel.findOneAndUpdate({ _id: userId }, { role: newRole }, { new: true });
            if (!updatedUser) {
                throw new Error('No se encontró ningún usuario con el ID proporcionado');
            }
            return updatedUser.toObject();
        } catch (error) {
            throw new Error('Error al actualizar usuario por ID en la base de datos');
        }
    }
    
    
}

export const userDao = new UserDao()
