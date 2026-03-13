import { Route, Routes } from 'react-router';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import Layout from './Layout';
import LoginPage from './pages/LoginPage';
import PaymentPage from './pages/PaymentPage';
import { Show } from '@clerk/react';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <>
              <Show when="signed-in">
                <DashboardPage />
              </Show>
              <Show when="signed-out">
                <LoginPage />
              </Show>
            </>
          }
        />
        <Route
          path="/payment/:sessionId"
          element={
            <>
              <Show when="signed-in">
                <PaymentPage />
              </Show>
              <Show when="signed-out">
                <LoginPage />
              </Show>
            </>
          }
        />

        {/* 404 Page */}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
