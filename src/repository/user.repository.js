import { userDao } from '../dao/user.dao.js';
import { UserDto } from '../dto/user.dto.js';

class UserRepository {
    async createUser(userData) {
        try {
            const user = await userDao.createUser(userData);
            return new UserDto(user);
        } catch (error) {
            throw error;
        }
    }

    async findOneUser(_id) {
        try {
            const userFound = await userDao.findOneUser(_id);
            return userFound ? new UserDto(userFound) : null;
        } catch (error) {
            throw error;
        }
    }

    async findUserByEmail({ email, password }) {
        try {
            const usuario = await userDao.findUserByEmail({ email, password });
            return usuario ? new UserDto(usuario) : null;
        } catch (error) {
            throw error;
        }
    }

    async findManyUser(query) {
        try {
            const usersFound = await userDao.findManyUser(query);
            return usersFound ? new UserDto(usersFound) : null;
        } catch (error) {
            throw error;
        }
    }


    async resetPassword(email, newPassword) {
        try {
            const updatedUser = await userDao.resetPassword(email, newPassword);
            return updatedUser ? new UserDto(updatedUser) : null;
        } catch (error) {
            throw error;
        }
    }
    
    
    async usersByRoles(roles) {
        try {
            const usersByRole = await userDao.usersByRoles(roles);
            return usersByRole.map(user => new UserDto(user));
        } catch (error) {
            throw error;
        }
    }

    async updateUserByEmail(email, newData) {
        try {
            const updatedUser = await userDao.updateUserByEmail(email, newData);
            return updatedUser ? new UserDto(updatedUser) : null;
        } catch (error) {
            throw error;
        }
    }

    async userCurrent(_id) {
        try {
            const userFound = await userDao.findOneUser(_id);
            return userFound ? new UserDto(userFound) : null;
        } catch (error) {
            throw error;
        }
    }

    async deleteUserById(_id) {
        try {
            const deletedUser = await userDao.deleteUserById(_id);
            return deletedUser ? new UserDto(deletedUser) : null;
        } catch (error) {
            throw error;
        }
    }

    async updateUserRole(userId, newRole) {
        try {
            const updatedUser = await userDao.updateUserRole(userId, newRole);
            return updatedUser;
        } catch (error) {
            throw error;
        }
    }
}

export const userRepository = new UserRepository();

