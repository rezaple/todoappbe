const { body, param, validationResult } = require('express-validator');
const Todo = require('../models/Todo'); // Sesuaikan dengan path model Anda


exports.createTodoValidation = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 64 })
    .withMessage('Nama todo harus antara 1-64 karakter')
    .notEmpty()
    .withMessage('Nama wajib diisi'),
    
  body('description')
    .trim()
    .isLength({ max: 500 })
    .withMessage('Deskripsi maksimal 500 karakter'),
    
];

// Validation rules untuk update todo
exports.updateTodoValidation = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID harus berupa angka positif'),
  
  body('name')
    .trim()
    .isLength({ min: 1, max: 64 })
    .withMessage('Nama todo harus antara 1-64 karakter')
    .notEmpty()
    .withMessage('Nama tidak boleh kosong'),
    
  body('description')
    .trim()
    .isLength({ max: 500 })
    .withMessage('Deskripsi maksimal 500 karakter'),
    
  body('status')
    .optional()
    .isIn(['pending', 'in_progress', 'completed'])
    .withMessage('Status harus berupa: pending, in_progress, atau completed')
];