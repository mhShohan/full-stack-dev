import React from 'react';
import { useContext } from 'react';
import TaskCard from '../components/TaskCard';
import { Context } from '../context/ContextProvider';

const AllTasks = () => {
  const {
    state: { tasks },
  } = useContext(Context);

  return (
    <div className="p-8 flex flex-wrap">
      {tasks.length <= 0 && (
        <h1 className="text-center text-6xl text-red-700">No Tasks Found!</h1>
      )}
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
};

export default AllTasks;
