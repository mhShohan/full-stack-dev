import React from 'react';
import { useContext } from 'react';
import { Context } from '../context/ContextProvider';
import { formatDate } from '../utils';
import { Link } from 'react-router-dom';

const TaskCard = ({ task }) => {
  const { clock, date } = formatDate(task.createdAt);
  const { deleteTask, reRender } = useContext(Context);

  const handleDelete = () => {
    deleteTask(task._id);
    reRender();
  };
  return (
    <div
      className="border-solid border-2 
    border-zinc-600 w-52 h-60 mr-4 mb-3 rounded-sm p-2 relative
    "
    >
      <h1 className="text-xl pt-2">{task.title}</h1>
      <p className="text-sm  text-justify">{task.description}</p>
      <p className="text-sm mt-4 bg-amber-600 w-20 px-1">{task.status}</p>

      <div className="absolute bottom-1 left-1 flex justify-between items-center">
        <div>
          <p className="text-sm">{clock}</p>
          <p className="text-[10px]">{date}</p>
        </div>
      </div>
      <div className="absolute right-1 bottom-2">
        <Link
          state={{ data: task }}
          to="/edit"
          className="border-solid border-[1px] border-green-700  p-1 ml-1 hover:bg-green-800 hover:text-zinc-200 ease-out duration-300"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="border-solid border-[1px] border-red-700  px-2 ml-1 hover:bg-red-800 hover:text-zinc-200 ease-out duration-300"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
