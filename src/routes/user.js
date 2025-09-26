const userController = require('../controllers/user');
const express = require('express');
const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.put('/:id/update-password', userController.updateUserPassword);

module.exports = router;