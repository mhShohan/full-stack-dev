import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function formateDate(date) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${day < 10 ? `0${day}` : day} ${months[month]}, ${year}`;
}

export default function CreateTask({ setTasks, total }) {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks((prev) => [
      ...prev,
      {
        id: total + 1,
        createdAt: formateDate(new Date()),
        task: input,
        status: 'processing',
      },
    ]);
    setInput('');
    navigate('/');
  };

  return (
    <div className="container flex justify-center align-bottom py-4">
      <form className="w-[400px] border-2 py-7 px-2 flex flex-col">
        <h1 className="text-center my-3">Create Your New Task!</h1>
        <input
          type="text"
          placeholder="Your Task"
          className="w-full px-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="button"
          className="bg-green-300  my-2"
          onClick={handleSubmit}
        >
          Create
        </button>
      </form>
    </div>
  );
}
