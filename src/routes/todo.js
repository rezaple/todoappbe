const todoController = require('../controllers/todo');
const express = require('express');
const router = express.Router();

router.get('/', todoController.getTodos);
router.get('/:id', todoController.getTodoById);
router.post('/', todoController.createTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);
router.post('/:id/change-status', todoController.changeStatus);

module.exports = router;