import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SubmitButton } from '../components/SubmitButton';
import { Context } from '../context/ContextProvider';

const EditTaskPage = () => {
  const location = useLocation();
  const data = location.state?.data;

  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);
  const [status, setStatus] = useState(data.status);
  const { updateTask } = useContext(Context);

  const handleUpdate = (e) => {
    e.preventDefault();
    updateTask(data._id, { title, description, status });
    window.location = '/all';
  };

  return (
    <div className="py-8 flex items-center justify-center flex-col">
      <h1 className="text-4xl my-4">Create New Task....</h1>
      <form className="flex flex-col w-[500px]" onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Task Title"
          className="outline-none mt-4 p-2 rounded-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          type="text"
          placeholder="Task Description"
          className="outline-none mt-4 p-2 rounded-sm h-[100px] mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex mb-4">
          <label htmlFor="status" className="flex-1 text-2xl">
            Status
          </label>
          <select
            name="status"
            id="status"
            className="outline-none flex-1"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="INPROGRESS">IN PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>
        <SubmitButton>Update</SubmitButton>
      </form>
    </div>
  );
};

export default EditTaskPage;
