import { Route, Routes } from 'react-router';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PaymentPage from './pages/PaymentPage';
import { Show } from '@clerk/react';
import AdminLayout from './layouts/AdminLayout';
import BookingsPage from './pages/admin/BookingsPage';
import SubjectPage from './pages/admin/SubjectPage';
import MentorPage from './pages/admin/MentorPage';
import Layout from './layouts/Layout';
import CreateSubjectPage from './pages/admin/CreateSubjectPage';
import CreateMentorPage from './pages/admin/CreateMentorPage';

function App() {
  return (
    <Routes>
      {/* PUBLIC LAYOUT */}
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path="login" element={<LoginPage />} />

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
        path="/admin"
        element={
          <Show when="signed-in" fallback={<LoginPage />}>
            <AdminLayout />
          </Show>
        }
      >
        <Route index path="mentors/view" element={<MentorPage />} />
        <Route path="mentors/create" element={<CreateMentorPage />} />
        <Route path="subjects/view" element={<SubjectPage />} />
        <Route path="subjects/create" element={<CreateSubjectPage />} />
        <Route path="bookings" element={<BookingsPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
