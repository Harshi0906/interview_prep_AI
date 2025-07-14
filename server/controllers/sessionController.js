import Session from "../models/SessionModel.js";
import Question from "../models/QuestionModel.js";

const createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description } = req.body;
    const userId = req.user._id;

    // Validation
    if (!role || !experience || !topicsToFocus) {
      return res.status(400).json({ success: false, message: "Role, experience and topicsToFocus are required." });
    }

    // Session creation (questions will be filled in next step with AI)
    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description,
      questions: [],
    });

    res.status(201).json({ success: true, data: session });
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getMySessions = async (req, res) => {
  try {
    // Fetch all sessions for the logged-in user
    // Sort by creation date, most recent first
    const sessions = await Session.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: sessions });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


const getSessionById = async (req, res) => {
  try {
    // Fetch session by ID with populated questions and user details
    // Ensure questions are sorted with pinned questions first
    //Among pinned or unpinned, sort by oldest first (ascending).
    const session = await Session.findById(req.params.id)
      .populate({
        path: "questions",
        options: { sort: { isPinned: -1, createdAt: 1 } },
      })
      .populate("user", "fullName email");

    if (!session) {
      return res.status(404).json({ success: false, message: "Session not found" });
    }

    // Ownership check
    if (session.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    res.status(200).json({ success: true, data: session });
  } catch (error) {
    console.error("Error fetching session:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


const deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ success: false, message: "Session not found" });
    }

    // Ownership check
    if (session.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    // Delete all related questions
    await Question.deleteMany({ session: session._id });

    // Delete session
    await session.deleteOne();

    res.status(200).json({ success: true, message: "Session and questions deleted" });
  } catch (error) {
    console.error("Error deleting session:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export {
  createSession,
  getMySessions,
  getSessionById,
  deleteSession
};
