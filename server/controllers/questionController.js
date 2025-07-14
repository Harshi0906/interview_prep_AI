import Session from "../models/SessionModel.js";
import Question from "../models/QuestionModel.js";

const addQuestionsToSession = async (req, res) => {
  try {
    // Extract sessionId and questions from request body
    const { sessionId, questions } = req.body;

    // Validate input
    // sessionId should be a valid MongoDB ObjectId and questions should be an array
    if (!sessionId || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // Check if session exists
    const session = await Session.findById(sessionId);

    // If session does not exist, return 404
    if (!session) { 
      return res.status(404).json({ message: "Session not found" });
    }

    // Create new questions
    const createdQuestions = await Question.insertMany(
      questions.map((q) => ({
        session: sessionId,
        question: q.question,
        answer: q.answer,
        isPinned: q.isPinned || false, // Default to false if not provided
        note: q.note || "", // Default to empty string if not provided
      }))
    );

    // Update session to include new question IDs
    const questionIds = createdQuestions.map((q) => q._id);
    session.questions.push(...questionIds);
    await session.save();

    res.status(201).json(createdQuestions);
  } catch (error) {
    console.error("Error adding questions to session:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


const togglePinQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    // Check if question exists
    if (!question) {
      return res
        .status(404)
        .json({ success: false, message: "Question not found" });
    }

    // Toggle the pin status
    question.isPinned = !question.isPinned;
    await question.save();

    res.status(200).json({ success: true, question });
  } catch (error) {
    console.error("Error toggling pin status:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


const updateQuestionNote = async (req, res) => {
  try {
    const { note } = req.body;
    const question = await Question.findById(req.params.id);

    // Check if question exists
    if (!question) {
      return res
        .status(404)
        .json({ success: false, message: "Question not found" });
    }

    // Update the note
    question.note = note || "";
    await question.save();

    res.status(200).json({ success: true, question });
  } catch (error) {
    console.error("Error updating question note:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export { addQuestionsToSession, togglePinQuestion, updateQuestionNote }; 
