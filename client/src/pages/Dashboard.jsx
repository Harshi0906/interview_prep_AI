import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment"; // For date formatting
import toast from "react-hot-toast"; // For notifications

import DashboardLayout from "../components/layouts/DashboardLayout.jsx";
import SummaryCard from "../components/Cards/SummaryCard.jsx";
import Modal from "../components/Modal.jsx";
import CreateSessionForm from "./CreateSessionForm.jsx";
import DeleteAlertContent from "../components/DeleteAlertContent.jsx";

import axiosInstance from "../utils/axiosInstance.js";
import API_PATHS  from "../utils/apiPaths.js";
import { CARD_BG } from "../utils/cardBG.js";

const Dashboard = () => {
  const navigate = useNavigate();

  const [sessions, setSessions] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response.data.data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));
      toast.success("Session deleted successfully");
      setOpenDeleteAlert({ open: false, data: null });
      fetchAllSessions(); // re-fetch updated list
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header Section */}
          <div className="mb-10 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Interview Sessions</h1>
              <p className="mt-2 text-gray-600">Manage and track your interview preparation</p>
            </div>
            <button
              onClick={() => setOpenCreateModal(true)}
              className="btn-primary flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              New Session
            </button>
          </div>

          {/* Sessions Grid */}
          {sessions.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-lg font-medium text-gray-900">No sessions yet</h3>
              <p className="mt-1 text-gray-500">Get started by creating your first interview session</p>
              <button
                onClick={() => setOpenCreateModal(true)}
                className="btn-primary mt-4"
              >
                Create Your First Session
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sessions.map((data, index) => (
                <SummaryCard
                  key={data?._id}
                  colors={CARD_BG[index % CARD_BG.length].bgcolor}
                  role={data?.role || ""}
                  topicsToFocus={data?.topicsToFocus || ""}
                  experience={data?.experience || "-"}
                  questions={data?.questions?.length || "-"}
                  description={data?.description || ""}
                  lastUpdated={
                    data?.updatedAt
                      ? moment(data.updatedAt).format("Do MMM YYYY")
                      : ""
                  }
                  onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                  onDelete={() => setOpenDeleteAlert({ open: true, data })}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
      >
        <CreateSessionForm
          onSuccess={() => {
            setOpenCreateModal(false);
            fetchAllSessions();
          }}
        />
      </Modal>

      <Modal
        isOpen={openDeleteAlert.open}
        onClose={() => setOpenDeleteAlert({ open: false, data: null })}
        title="Delete Session"
      >
        <DeleteAlertContent
          content="Are you sure you want to delete this interview session? This action cannot be undone."
          onDelete={() => deleteSession(openDeleteAlert.data)}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;
