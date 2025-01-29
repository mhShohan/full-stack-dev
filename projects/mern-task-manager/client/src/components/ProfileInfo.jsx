import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/ContextProvider';

const ProfileInfo = () => {
  const { state } = useContext(Context);

  return (
    <div className="flex flex-col items-center mt-4">
      <img
        src={state.user.avatar}
        alt="avatar"
        className="w-[150px] h-[150px] rounded-full"
      />
      <h1 className="capitalize">{`${state.user.firstName} ${state.user.lastName}`}</h1>
      <h3>{state.user.email}</h3>
      <Link
        to="/profile"
        className=" mt-2 py-1 px-6 border-solid border-2 border-zinc-500 rounded-sm hover:bg-zinc-500"
      >
        View profile
      </Link>
    </div>
  );
};

export default ProfileInfo;
