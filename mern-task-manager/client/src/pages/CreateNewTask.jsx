import React, { useContext, useState } from 'react';
import { SubmitButton } from '../components/SubmitButton';
import { Context } from '../context/ContextProvider';

const CreateNewTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { addNewTask } = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewTask({ title, description });
    window.location = '/all';
  };

  return (
    <div className="py-8 flex items-center justify-center flex-col">
      <h1 className="text-4xl my-4">Create New Task....</h1>
      <form className="flex flex-col w-[500px]" onSubmit={handleSubmit}>
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
        <SubmitButton>Add Task</SubmitButton>
      </form>
    </div>
  );
};

export default CreateNewTask;
