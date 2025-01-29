import React, { useContext } from 'react';
import TaskCard from '../components/TaskCard';
import { Context } from '../context/ContextProvider';

const CompletedTasks = () => {
  const {
    state: { tasks },
  } = useContext(Context);

  const completedTask = tasks.filter((t) => t.status === 'COMPLETED');

  return (
    <div className="p-8 flex flex-wrap">
      {completedTask.length <= 0 && (
        <h1 className="text-red-700 text-6xl">No Completed tasks yet! </h1>
      )}
      {completedTask.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
};

export default CompletedTasks;
