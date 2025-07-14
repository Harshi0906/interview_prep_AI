import React, { useState } from "react";

const QuestionCard = ({
  question = "",
  answer = "",
  note = "",
  isPinned = false,
  onPin = () => {},
  onExplain = () => {},
  onUpdateNote = () => {},
}) => {
  const [editing, setEditing] = useState(false);
  const [noteText, setNoteText] = useState(note);
  const [saving, setSaving] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onUpdateNote(noteText);
    setSaving(false);
    setEditing(false);
  };

  return (
    <div className="rounded-lg bg-white/90 border border-gray-200 shadow p-3 md:p-4 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-1">
          {isPinned && (
            <span className="text-yellow-500 text-lg" title="Pinned">
              📌
            </span>
          )}
          <h3 className="text-base font-semibold text-gray-800">Question</h3>
        </div>
        <div className="flex gap-1 items-center">
          {answer && (
            <button
              type="button"
              onClick={() => setShowAnswer((prev) => !prev)}
              className="flex items-center gap-1 text-indigo-700 font-medium text-xs focus:outline-none hover:underline"
            >
              {showAnswer ? (
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
              {showAnswer ? "Hide" : "Show"}
            </button>
          )}
          <button
            onClick={onPin}
            className={`px-2 py-0.5 rounded text-xs font-medium transition-colors duration-200 ${
              isPinned
                ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {isPinned ? "Unpin" : "Pin"}
          </button>
          <button
            onClick={onExplain}
            className="px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700 hover:bg-green-200 transition-colors duration-200"
          >
            Learn More
          </button>
        </div>
      </div>

      <p className="text-gray-800 mb-2 whitespace-pre-line text-sm leading-snug">
        {question}
      </p>

      {answer && showAnswer && (
        <div className="mb-2">
          <div className="bg-indigo-50 border border-indigo-100 rounded p-2 text-gray-700 whitespace-pre-line text-xs animate-fade-in">
            {answer}
          </div>
        </div>
      )}

      <div className="mt-2">
        <h4 className="text-xs font-semibold text-indigo-700 mb-1 flex items-center gap-1">
          <svg
            className="w-3 h-3 text-indigo-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536M9 11l6 6M3 21h18M3 3v18"
            />
          </svg>
          Your Notes
        </h4>
        <div className="bg-gray-50 border border-gray-200 rounded p-2">
          {editing ? (
            <div className="space-y-1">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="w-full border border-indigo-200 rounded p-1 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all min-h-[40px] text-xs bg-white shadow-sm"
                rows={2}
                placeholder="Add your thoughts, tips, or reminders here..."
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-3 py-0.5 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700 transition-colors duration-200 shadow"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => {
                    setNoteText(note);
                    setEditing(false);
                  }}
                  className="text-xs text-gray-600 hover:underline"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-start">
              <p
                className={`text-xs ${
                  note ? "text-gray-700" : "text-gray-400 italic"
                } whitespace-pre-line`}
              >
                {note || "No notes yet. Click Edit to add your notes."}
              </p>
              <button
                onClick={() => setEditing(true)}
                className="text-xs text-indigo-600 hover:underline ml-2 font-medium"
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;