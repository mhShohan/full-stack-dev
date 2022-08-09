import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="px-20 py-2 flex border-b-2 align-bottom">
      <div className="flex-1">
        <a href="/" className="text-lg">
          Simple Task Manager!
        </a>
      </div>
      <div className="flex-1 flex justify-center">
        <input
          type="text"
          placeholder="Search"
          className="px-2 border-none outline-0 rounded"
        />
      </div>
      <div className="flex-1 flex justify-end">
        <Link to="create" className="text-gray-800 hover:underline">
          Create New Task
        </Link>
      </div>
    </nav>
  );
}
