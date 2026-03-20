import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocialProvider } from './context/SocialContext';
import { MessageProvider } from './context/MessageContext'; // This will now work
import ProtectedRoute from './components/ProtectedRoute';

// Auth Pages
import StudentLogin from './pages/auth/StudentLogin';
import FacultyLogin from './pages/auth/FacultyLogin';
import AdminLogin from './pages/auth/AdminLogin';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import StudentInfo from './pages/student/StudentInfo';

// Faculty Pages
import FacultyDashboard from './pages/faculty/FacultyDashboard';
import FacultyInfo from './pages/faculty/FacultyInfo';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UsersManagement from './pages/admin/UsersManagement';

// Shared Pages
import Instruction from './pages/shared/Instruction';
import Scheduling from './pages/shared/Scheduling';
import Events from './pages/shared/Events';
import Search from './pages/shared/Search';

// Social Pages
import SocialFeed from './pages/social/SocialFeed';
import StudyGroups from './pages/social/StudyGroups';
import Messages from './pages/social/Messages';

function App() {
  return (
    <Router>
      <AuthProvider>
        <SocialProvider>
          <MessageProvider> {/* This will now work */}
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<StudentLogin />} />
              <Route path="/faculty" element={<FacultyLogin />} />
              <Route path="/admin" element={<AdminLogin />} />

              {/* Student Routes */}
              <Route element={<ProtectedRoute role="student" />}>
                <Route path="/student-dashboard" element={<StudentDashboard />} />
                <Route path="/student-dashboard/student-info" element={<StudentInfo />} />
                <Route path="/student-dashboard/instruction" element={<Instruction />} />
                <Route path="/student-dashboard/scheduling" element={<Scheduling />} />
                <Route path="/student-dashboard/events" element={<Events />} />
                <Route path="/student-dashboard/search" element={<Search />} />
                {/* Social Pages */}
                <Route path="/student-dashboard/social" element={<SocialFeed />} />
                <Route path="/student-dashboard/study-groups" element={<StudyGroups />} />
                <Route path="/student-dashboard/messages" element={<Messages />} />
              </Route>

              {/* Faculty Routes */}
              <Route element={<ProtectedRoute role="faculty" />}>
                <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
                <Route path="/faculty-dashboard/faculty-info" element={<FacultyInfo />} />
                <Route path="/faculty-dashboard/instruction" element={<Instruction />} />
                <Route path="/faculty-dashboard/scheduling" element={<Scheduling />} />
                <Route path="/faculty-dashboard/events" element={<Events />} />
                <Route path="/faculty-dashboard/search" element={<Search />} />
                {/* Social Pages */}
                <Route path="/faculty-dashboard/social" element={<SocialFeed />} />
                <Route path="/faculty-dashboard/study-groups" element={<StudyGroups />} />
                <Route path="/faculty-dashboard/messages" element={<Messages />} />
              </Route>

              {/* Admin Routes */}
              <Route element={<ProtectedRoute role="admin" />}>
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/admin-dashboard/users" element={<UsersManagement />} />
                <Route path="/admin-dashboard/instruction" element={<Instruction />} />
                <Route path="/admin-dashboard/scheduling" element={<Scheduling />} />
                <Route path="/admin-dashboard/events" element={<Events />} />
                <Route path="/admin-dashboard/search" element={<Search />} />
                {/* Social Pages */}
                <Route path="/admin-dashboard/social" element={<SocialFeed />} />
                <Route path="/admin-dashboard/study-groups" element={<StudyGroups />} />
                <Route path="/admin-dashboard/messages" element={<Messages />} />
              </Route>

              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </MessageProvider>
        </SocialProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;