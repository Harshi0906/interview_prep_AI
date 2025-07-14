import express from 'express';
import { generateInterviewQuestions, generateConceptExplanation } from '../controllers/aiController.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Generate interview questions and answers using Gemini
// @route   POST /api/ai/generate-questions
// @access  Private
router.post('/generate-questions', verifyToken, generateInterviewQuestions);

// @desc    Generate explaination for a interview question
// @route   POST /api/ai/generate-explanation
// @access  Private
router.post('/generate-explanation', verifyToken, generateConceptExplanation);

export default router;