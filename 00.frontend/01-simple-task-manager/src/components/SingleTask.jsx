import React from 'react';

export default function SingleTask({ index, task }) {
  return (
    <>
      <tr className="border-b-2">
        <td className=" text-center text-dark font-medium  text-base px-2">
          {index + 1}
        </td>
        <td className="text-center text-dark font-medium text-base px-2">
          {task.task}
        </td>
        <td className="text-center text-dark font-medium text-base px-2">
          {task.createdAt}
        </td>
        <td className="text-center text-dark font-medium text-base px-2 py-2">
          <button className="bg-green-400 px-2 rounded">Edit</button>
          <button className="bg-red-400 ml-1 px-2 rounded">Delete</button>
        </td>
      </tr>
    </>
  );
}
