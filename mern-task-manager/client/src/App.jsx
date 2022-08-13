import React, { useContext } from 'react';
import Layout from './components/layout/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import AllTasks from './pages/AllTasks';
import CompletedTasks from './pages/CompletedTasks';
import PendingTasks from './pages/PendingTasks';
import CanceledTask from './pages/CanceledTask';
import ProfilePage from './pages/ProfilePage';
import axios from 'axios';
import { Context } from './context/ContextProvider';
import CreateNewTask from './pages/CreateNewTask';
import EditTaskPage from './pages/EditTaskPage';

axios.defaults.withCredentials = true;

export default function App() {
  const { isLogin } = useContext(Context);

  return (
    <BrowserRouter>
      {isLogin ? (
        <Layout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/all" element={<AllTasks />} />
            <Route path="/create" element={<CreateNewTask />} />
            <Route path="/edit" element={<EditTaskPage />} />
            <Route path="/completed" element={<CompletedTasks />} />
            <Route path="/inprogress" element={<PendingTasks />} />
            <Route path="/cancelled" element={<CanceledTask />} />
            <Route path="/profile" element={<ProfilePage />} />
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
