const db = require('../models');
const { validationResult } = require('express-validator');

const { createTodoValidation, updateTodoValidation } = require('../validations/todo');
const Todo = db.Todo;

exports.createTodo = [
  ...createTodoValidation,
  async (req, res) => {
  try {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { name, description } = req.body;
    const { id: user_id } = req.app.locals.credential;
    const status = 'pending'; // Default status
    const newTodo = await Todo.create({ user_id, name, description, status });
    res.status(201).json(newTodo);
  } catch (error) {
    
    res.status(500).json({ error: 'Failed to create todo' });
  }
}
]

exports.getTodos = async (req, res) => {
  try {
    const { id: user_id } = req.app.locals.credential;
    const { status } = req.query;
    const query = status ? { user_id: user_id, status: { [db.Sequelize.Op.like]: `%${status}%` } } : { user_id: user_id}
    const todos = await Todo.findAll({
      where: query
    });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to fetch todos' });
  }
}

exports.getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todo' });
  }
}

exports.updateTodo = [
  ...updateTodoValidation,
  async (req, res) => {
    try {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: 'Validation failed',
          details: errors.array()
        });
      }

      const { id } = req.params;
      const { name, description, status } = req.body;
      const [updated] = await Todo.update({ name, description, status }, { where: { id } });
      if (updated) {
        const updatedTodo = await Todo.findByPk(id);
        res.status(200).json(updatedTodo);
      } else {
        res.status(404).json({ error: 'Todo not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update todo' });
    }
  }
]

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Todo.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
}

exports.changeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const [updated] = await Todo.update({ status }, { where: { id } });
    if (updated) {
      res.status(200).json({
        message: 'Todo status updated successfully',
      });
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo status' });
  }
}