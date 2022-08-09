import React, { useState } from 'react';
import Layout from './components/layout/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import AllTasks from './pages/AllTasks';
import CompletedTasks from './pages/CompletedTasks';
import PendingTasks from './pages/PendingTasks';
import CanceledTask from './pages/CanceledTask';

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <BrowserRouter>
      {isLogin ? (
        <Layout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/all" element={<AllTasks />} />
            <Route path="/completed" element={<CompletedTasks />} />
            <Route path="/pending" element={<PendingTasks />} />
            <Route path="/canceled" element={<CanceledTask />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}
