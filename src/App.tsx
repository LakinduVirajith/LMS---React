import { Route, Routes } from 'react-router';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PaymentPage from './pages/PaymentPage';
import TutorsPage from './pages/TutorsPage';
import { Show } from '@clerk/react';
import AdminLayout from './layouts/AdminLayout';
import BookingsPage from './pages/admin/BookingsPage';
import SubjectPage from './pages/admin/SubjectPage';
import MentorPage from './pages/admin/MentorPage';
import Layout from './layouts/Layout';
import CreateSubjectPage from './pages/admin/CreateSubjectPage';
import CreateMentorPage from './pages/admin/CreateMentorPage';
import TutorProfilePage from './pages/TutorProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import AboutUsPage from './pages/AboutUsPage';

function App() {
  return (
    <Routes>
      {/* PUBLIC LAYOUT */}
      <Route path="" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="tutors" element={<TutorsPage />} />
        <Route path="tutors/:mentorId" element={<TutorProfilePage />} />
        <Route path="about" element={<AboutUsPage />} />

        <Route
          path="dashboard"
          element={
            <Show when="signed-in" fallback={<LoginPage />}>
              <DashboardPage />
            </Show>
          }
        />

        <Route
          path="payment/:sessionId"
          element={
            <Show when="signed-in" fallback={<LoginPage />}>
              <PaymentPage />
            </Show>
          }
        />
      </Route>

      {/* ADMIN LAYOUT */}
      <Route
        path="admin"
        element={
          <Show when="signed-in" fallback={<LoginPage />}>
            <AdminLayout />
          </Show>
        }
      >
        <Route index element={<MentorPage />} />
        <Route path="mentors/view" element={<MentorPage />} />
        <Route path="mentors/create" element={<CreateMentorPage />} />
        <Route path="subjects/view" element={<SubjectPage />} />
        <Route path="subjects/create" element={<CreateSubjectPage />} />
        <Route path="bookings/manage" element={<BookingsPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
