import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Tasks from './components/Tasks';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateTask from './components/CreateTask';

const App = () => {
  const [tasks, setTasks] = useState([]);
  console.log(tasks);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Tasks tasks={tasks} />} />
          <Route
            path="create"
            element={<CreateTask setTasks={setTasks} total={tasks.length} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
