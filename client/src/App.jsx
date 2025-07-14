import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard.jsx';
import InterviewPrep from './pages/InterviewPrep';
import { UserProvider } from './context/userContext.jsx'
// import TestQuestionCard from './pages/test'; 

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/interview-prep/:sessionId" element={<InterviewPrep />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
