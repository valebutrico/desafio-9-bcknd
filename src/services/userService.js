import UserDao from '../dao/userDao.js';

class UserService {
    static async getAllUsers() {
        return await UserDao.findAll();
    }

    static async getUserById(id) {
        return await UserDao.findById(id);
    }

    static async createUser(userData) {
        return await UserDao.create(userData);
    }
}

export default UserService;
