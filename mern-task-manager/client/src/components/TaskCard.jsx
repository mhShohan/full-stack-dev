import React from 'react';

const TaskCard = ({ data }) => {
  return (
    <div
      className="border-solid border-2 
    border-zinc-600 w-52 h-60 mr-4 mb-3 rounded-sm p-2 relative
    "
    >
      <h1 className="text-xl pt-2">Read the book</h1>
      <p className="text-sm text-sm text-justify">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore
        architecto ex illum tempora? Placeat ducimus reiciendis doloremque sint,
      </p>

      <div className="absolute bottom-1 left-1 flex justify-between items-center">
        <div>
          <p className="text-sm">04:32 PM</p>
          <p className="text-[10px]">09 August, 2022</p>
        </div>
      </div>
      <div className="absolute right-1 bottom-2">
        <button className="border-solid border-[1px] border-green-700  px-2 ml-1 hover:bg-green-800 hover:text-zinc-200 ease-out duration-300">
          Edit
        </button>
        <button className="border-solid border-[1px] border-red-700  px-2 ml-1 hover:bg-red-800 hover:text-zinc-200 ease-out duration-300">
          X
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
