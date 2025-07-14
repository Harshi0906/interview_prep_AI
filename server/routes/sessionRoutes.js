import express from 'express';
import {createSession, getMySessions, getSessionById, deleteSession } from '../controllers/sessionController.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/sessions/create
// @desc    Create a new session
// @access  Private
router.post('/create', verifyToken, createSession);


// @desc    Get all sessions of the logged-in user
// @route   GET /api/sessions
// @access  Private
router.get('/my-sessions', verifyToken, getMySessions);

// @desc    Get one session by ID with populated questions
// @route   GET /api/sessions/:id
// @access  Private
router.get('/:id', verifyToken, getSessionById);


// @desc    Delete a session and its linked questions
// @route   DELETE /api/sessions/:id
// @access  Private
router.delete('/:id', verifyToken, deleteSession);


export default router;