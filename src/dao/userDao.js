import User from '../models/User.js';

class UserDao {
    static async findAll() {
        return await User.find();
    }

    static async findById(id) {
        return await User.findById(id);
    }

    static async create(userData) {
        const user = new User(userData);
        return await user.save();
    }
}

export default UserDao;
