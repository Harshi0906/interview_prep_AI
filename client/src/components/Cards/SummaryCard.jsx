// src/components/Cards/SummaryCard.jsx
import React from "react";

const SummaryCard = ({
  colors = "bg-gray-100",
  role = "",
  experience = "",
  topicsToFocus = "",
  questions = "",
  description = "",
  lastUpdated = "",
  onSelect = () => {},
  onDelete = () => {},
}) => {
  return (
    <div
      className={`p-6 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02] 
      hover:-translate-y-1 backdrop-blur-sm bg-white/90 border border-gray-100 ${colors}`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800 leading-tight">{role}</h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-sm text-red-500 hover:text-red-600 hover:underline 
          transition-colors duration-200"
        >
          Delete
        </button>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-700">
          <span className="font-medium">Experience:</span>{" "}
          <span className="text-gray-600">{experience}</span>
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Topics:</span>{" "}
          <span className="text-gray-600">{topicsToFocus}</span>
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Questions:</span>{" "}
          <span className="text-gray-600">{questions}</span>
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Description:</span>{" "}
          <span className="text-gray-600 line-clamp-2">{description}</span>
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          <span className="font-medium">Last Updated:</span>{" "}
          <span>{lastUpdated}</span>
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
