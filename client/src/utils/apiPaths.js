export const BASE_URL = "http://localhost:5000/api";

const API_PATHS = {
  AUTH: {
    SIGNUP: "/auth/signup", // Signup
    LOGIN: "/auth/login", // Authenticate user & return JWT token
    GET_PROFILE: "/auth/profile", // Get logged-in user details
  },

  AI: {
    GENERATE_QUESTIONS: "/ai/generate-questions", // Generate interview questions and answers using Gemini
    GENERATE_EXPLANATION: "/ai/generate-explanation", // Generate concept explanation using Gemini
  },

  SESSION: {
    CREATE: "/sessions/create", // Create a new interview session with questions
    GET_ALL: "/sessions/my-sessions", //  Get all user sessions
    GET_ONE: (id) => `/sessions/${id}`, // Get session details with questions
    DELETE: (id) => `/sessions/${id}`, // Delete a session
  },

  QUESTION: {
    ADD: "/questions/add", // Add more questions to a session
    TOGGLE_PIN: (id) => `/questions/${id}/pin`, // Pin or Unpin a question
    UPDATE_NOTE: (id) => `/questions/${id}/note`, // Update/Add a note to a question
  },
};

export default API_PATHS;
