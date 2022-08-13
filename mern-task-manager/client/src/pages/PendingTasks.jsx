import React, { useContext } from 'react';
import TaskCard from '../components/TaskCard';
import { Context } from '../context/ContextProvider';

function PendingTasks() {
  const {
    state: { tasks },
  } = useContext(Context);

  const task = tasks.filter((t) => t.status === 'INPROGRESS');

  return (
    <div className="p-8 flex flex-wrap">
      {task.length <= 0 && (
        <h1 className="text-red-700 text-6xl">No In progress task yet! </h1>
      )}
      {task.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
}

export default PendingTasks;
