import express from 'express'
const router = express.Router();
import { registerUser } from '../controllers/user.controller.js';
import { body } from 'express-validator';


router.post('/register', [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),

  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email address'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
],registerUser)

export default router;