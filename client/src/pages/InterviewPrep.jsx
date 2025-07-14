// src/pages/InterviewPrep.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import toast from "react-hot-toast";

import axiosInstance from "../utils/axiosInstance.js";
import API_PATHS from "../utils/apiPaths.js";
import QuestionCard from "../components/Cards/QuestionCard.jsx";

const InterviewPrep = () => {
  const { sessionId } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState(false);

  // Fetch session + its saved questions
  const fetchSessionDetails = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));
      // depending on your API shape:
      setSessionData(res.data.data || res.data.session);
    } catch (err) {
      toast.error("Failed to load session");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Generate (or regenerate) questions: AI -> then save to session
  const generateQuestions = async () => {
    if (!sessionData) return;
    setWorking(true);
    const toastId = toast.loading("Generating questions…");
    try {
      // 1) Ask AI for Q&A JSON array
      const aiRes = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
        role: sessionData.role,
        experience: sessionData.experience,
        topicsToFocus: sessionData.topicsToFocus,
        numberOfQuestions: 3,
      });
      const generated = aiRes.data.questions;
      if (!Array.isArray(generated)) {
        throw new Error("AI returned bad format");
      }

      // 2) Persist those questions under this session
      await axiosInstance.post(API_PATHS.QUESTION.ADD, {
        sessionId,
        questions: generated,
      });

      toast.success("Questions generated and saved!", { id: toastId });
      await fetchSessionDetails();
    } catch (err) {
      toast.error("Failed to generate questions", { id: toastId });
      console.error("generateQuestions error:", err);
    } finally {
      setWorking(false);
    }
  };

  // Pin/unpin, explain, note update as before…
  const handleTogglePin = async (qid) => {
    try {
      await axiosInstance.post(API_PATHS.QUESTION.TOGGLE_PIN(qid));
      await fetchSessionDetails();
    } catch (e) {
      toast.error("Pin toggle failed");
    }
  };
  const handleExplain = async (qid) => {
  setWorking(true);
  const toastId = toast.loading("Generating explanation…");
  try {
    const questionObj = sessionData.questions.find(q => q._id === qid);

    if (!questionObj || !questionObj.question) {
      throw new Error("Question text not found for explanation.");
    }

    await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATION, {
      questionId: qid,            // Send the ID
      question: questionObj.question, // Send the question text
    });

    toast.success("Explanation added!", { id: toastId });
    await fetchSessionDetails();
  } catch (e) {
    toast.error("Failed to generate explanation", { id: toastId });
    console.error("handleExplain error:", e);
  } finally {
    setWorking(false);
  }
};
  const handleNoteUpdate = async (qid, note) => {
    try {
      await axiosInstance.post(API_PATHS.QUESTION.UPDATE_NOTE(qid), { note });
      toast.success("Note saved");
      await fetchSessionDetails();
    } catch (e) {
      toast.error("Note save failed");
    }
  };

  useEffect(() => {
    fetchSessionDetails();
  }, [sessionId]);

  if (loading) return <div className="p-6">Loading session…</div>;

  const hasQs = sessionData?.questions?.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 p-6">
      <h1 className="text-2xl font-bold mb-2">{sessionData.role}</h1>
      <p className="text-sm text-gray-600 mb-4">
        {sessionData.experience} • {sessionData.topicsToFocus} • Last updated{" "}
        {moment(sessionData.updatedAt).format("Do MMM YYYY")}
      </p>

      <div className="flex gap-4 mb-6">
        <button
          onClick={generateQuestions}
          disabled={working}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {working ? "Working…" : "Generate More"}
        </button>
      </div>
  

      <h2 className="text-lg font-semibold mb-2">Questions</h2>
      {!hasQs ? (
        <p>No questions yet.</p>
      ) : (
        <ul className="space-y-4">
          {sessionData.questions.map((q) => (
            <li key={q._id}>
              <QuestionCard
                question={q.question}
                answer={q.answer}
                note={q.note}
                isPinned={q.isPinned}
                onPin={() => handleTogglePin(q._id)}
                onExplain={() => handleExplain(q._id)}
                onUpdateNote={(n) => handleNoteUpdate(q._id, n)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InterviewPrep;
