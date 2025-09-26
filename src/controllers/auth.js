const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const User = db.User;
require('dotenv').config();

exports.register = async (req, res) => {
  try {
    const { name, username, password, email } = req.body;
    const user = await User.findOne({ 
      where: {
        [Op.or]: [{ username: username }, { email: email }],
      },
    });

    if(user) {
        return res.status(400).json({ error: 'Username/Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword, name });
    res.status(201).json({
        message: 'User registered successfully',
    });
  } catch (error) {
    res.status(500).json({ error: error.message+'Failed to register user' });
  }
}

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (user) {
        if (await bcrypt.compare(password, user.password)) {
            const secretKey = process.env.SECRET || 'secretKey';
            const data_user = { id: user.id, username: user.username, name: user.name, email: user.email };
            const token = jwt.sign(data_user, secretKey, { expiresIn: '2h' });

            return res.status(200).json({
                message: 'Login successful',
                user: data_user,
                token
            });
        }else{
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message+'Failed to login' });
  }
}

exports.verify = async (req, res) => {
  try {

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const secretKey = process.env.SECRET || 'secretKey';
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid token' });
      }
      res.status(200).json({ message: 'Token is valid', user });
    }); 
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify token' });
  }
}