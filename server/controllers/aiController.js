import dotenv from "dotenv";
dotenv.config(); // ✅ Load environment variables early

import { GoogleGenAI } from "@google/genai";
import { questionAnswerPrompt, conceptExplainPrompt } from "../utils/prompt.js";
import Question from "../models/QuestionModel.js";

// ✅ Check if GEMINI_API_KEY is loaded
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY is missing in .env");
  process.exit(1);
}

// ✅ Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// ✅ Helper: extract plain text from Gemini response
function getGeminiText(response) {
  if (response && response.candidates?.[0]?.content?.parts?.[0]?.text) {
    return response.candidates[0].content.parts[0].text;
  }
  return null;
}

// ✅ Helper: try parsing Gemini output as JSON
const tryParseJSON = (text) => {
  try {
    return { json: JSON.parse(text), error: null };
  } catch {
    const cleaned = text
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();
    try {
      return { json: JSON.parse(cleaned), error: null };
    } catch (err) {
      return { json: null, error: err.message };
    }
  }
};

// ✅ POST /api/ai/generate-questions
const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: [{ text: prompt }],
    });

    const text = getGeminiText(response);
    if (!text)
      return res.status(500).json({ message: "No response from Gemini" });

    const { json, error } = tryParseJSON(text);

    if (json) {
      res.status(200).json({ questions: json });
    } else {
      res
        .status(500)
        .json({ message: "Gemini returned invalid JSON", raw: text, error });
    }
  } catch (error) {
    console.error("❌ Error generating questions:", error.message);
    res
      .status(500)
      .json({ message: "Failed to generate questions", error: error.message });
  }
};

// ✅ POST /api/ai/generate-explanation
const generateConceptExplanation = async (req, res) => {
  try {
    const { questionId, question } = req.body;

    if (!questionId || !question) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = conceptExplainPrompt(question);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: [{ text: prompt }],
    });

    const text = getGeminiText(response);
    if (!text)
      return res.status(500).json({ message: "No response from Gemini" });

    const { json } = tryParseJSON(text);

    let explanation = "";
    if (json?.explanation) {
      explanation = json.explanation;
    } else {
      explanation = typeof json === "object" ? JSON.stringify(json) : text;
    }

    const existingQuestion = await Question.findById(questionId);
    if (!existingQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    const newAnswer = `${
      existingQuestion.answer || ""
    }\n\nExplanation:\n${explanation}`;
    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      { answer: newAnswer },
      { new: true }
    );

    res.status(200).json({ question: updatedQuestion });
  } catch (error) {
    console.error("❌ Error generating explanation:", error.message);
    res.status(500).json({
      message: "Failed to generate explanation",
      error: error.message,
    });
  }
};

export { generateInterviewQuestions, generateConceptExplanation };
