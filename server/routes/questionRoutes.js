import express from "express" ;
import verifyToken from "../middleware/authMiddleware.js";
import {addQuestionsToSession, togglePinQuestion, updateQuestionNote} from "../controllers/questionController.js" ;

const router = express.Router() ;

// @desc    Add a question to a session
// @route   POST /api/questions/add   
// @access  Private
router.post("/add", verifyToken, addQuestionsToSession) ;

// @desc    Toggle pin status of a question
// @route   POST /api/questions/:id/pin   
// @access  Private
router.post("/:id/pin", verifyToken, togglePinQuestion) ;

// @desc    Update a question's note
// @route   POST /api/questions/:id/note
// @access  Private
router.post("/:id/note", verifyToken, updateQuestionNote) ;

export default router ;
