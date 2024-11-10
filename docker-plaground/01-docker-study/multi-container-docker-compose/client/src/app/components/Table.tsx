"use client";
import React, { useState } from "react";
import Modal from "./Modal";

interface User {
  _id: string;
  name: string;
  email: string;
  profilePhoto: string;
}

interface TableBodyProps {
  user: User;
}

const Table: React.FC<TableBodyProps> = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <tr className="border-b bg-gray-800 hover:bg-gray-700 transition duration-200">
        <td className="py-4 px-6">
          <img
            src={user.profilePhoto}
            alt={user.name}
            className="w-16 h-16 rounded-full border-2 border-white"
          />
        </td>
        <td className="py-4 px-6">{user.email}</td>
        <td className="py-4 px-6">
          <button
            onClick={handleOpenModal}
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded transition duration-300"
          >
            View Info
          </button>
        </td>
      </tr>

      {/* Modal for User Info */}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="User Info">
        <div className="flex items-center mb-4 ">
          <img
            src={user.profilePhoto}
            alt="Profile"
            className="w-24 h-24 rounded-full mr-4 border-2 border-white"
          />
          <div>
            <p className="text-lg font-semibold text-white">{user.name}</p>
            <p className="text-gray-300">{user.email}</p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Table;
