/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { createUser } from "../actions";
import AddUserModal from "./AddUserModal";
import Table from "./Table";

const UserManagement = ({ users }: any) => {
  const initialState = {
    message: "",
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, formAction] = useFormState(createUser, initialState);
  const handleOpenAddUserModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    handleCloseModal();
    console.log(state);
  }, [state]);

  return (
    <div className="flex flex-col h-screen w-screen bg-black">
      <h1 className="text-4xl font-extrabold text-center text-white mt-6">
        User Management View Page
      </h1>
      <div className="flex-grow flex justify-center items-center">
        <div className="card">
          <button
            onClick={handleOpenAddUserModal}
            className="bg-green-500 text-white py-2 px-4 rounded mb-4"
          >
            Add User
          </button>
          <p aria-live="polite" className="text-orange-500">
            {state?.message}
          </p>

          <table className="min-w-full text-white">
            <thead>
              <tr className="bg-blue-900 text-white shadow-md">
                <th className="py-4 px-6 text-left text-lg">Profile Photo</th>
                <th className="py-4 px-6 text-left text-lg">Email</th>
                <th className="py-4 px-6 text-left text-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => (
                <Table key={user._id} user={user} />
              ))}
            </tbody>
          </table>
          <span className="top" />
          <span className="bottom" />
          <span className="right" />
          <span className="left" />
        </div>
      </div>

      {/* Add User Modal */}
      <AddUserModal
        state={state}
        formAction={formAction}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default UserManagement;
