import React from 'react';
import TaskCard from '../components/TaskCard';

const AllTasks = () => {
  return (
    <div className="p-8 flex flex-wrap">
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
    </div>
  );
};

export default AllTasks;
