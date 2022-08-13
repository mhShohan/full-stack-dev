import React from 'react';
import { useContext } from 'react';
// import { Link } from 'react-router-dom';
import { Context } from '../context/ContextProvider';

const ProfilePage = () => {
  const { state } = useContext(Context);
  const { firstName, lastName, email, avatar, title, description } = state.user;
  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <div className="w-[300px] h-[300px]">
        <img src={avatar} alt="pro pic" className="w-full rounded-full" />
      </div>
      <div>
        <h1 className="text-4xl capitalize">{`${firstName} ${lastName}`}</h1>
        <p className="text-sm text-zinc-700">{email}</p>
      </div>
      <h2>{title}</h2>
      <p className="w-[600px] mt-4 text-center">{description}</p>
      {/* <Link
        to="/edit-profile"
        className=" mt-2 py-1 px-6 border-solid border-2 border-zinc-600 rounded-sm hover:bg-zinc-600"
      >
        Edit Profile
      </Link> */}
    </div>
  );
};

export default ProfilePage;
