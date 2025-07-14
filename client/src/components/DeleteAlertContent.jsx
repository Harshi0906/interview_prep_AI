import React from 'react'

const DeleteAlertContent = ({ content, onDelete }) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-red-100">
        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      
      <p className="mb-4 text-center text-gray-700">{content}</p>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onDelete}
          className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 
          transition-colors duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlertContent