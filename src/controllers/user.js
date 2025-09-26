const db = require('../models');
const User = db.User;


exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (user) {
            res.status(200).json({
                id: user.id,
                name: user.name,
                username: user.username
            });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, username } = req.body;
        const [updated] = await User.update({ name, username }, { where: { id } });
        if (updated) {
            res.status(200).json({
                message: 'User updated successfully',
            });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
}

exports.updateUserPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const [updated] = await User.update({ password: hashedPassword }, { where: { id } });
        if (updated) {
            const updatedUser = await User.findByPk(id);
            res.status(200).json({
                message: 'Password updated successfully',
            });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user password' });
    }
}
