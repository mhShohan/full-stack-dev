import React from 'react';
import avatar from '../assets/image/avatar.png';

const ProfileInfo = () => {
  return (
    <div className="flex flex-col items-center mt-4">
      <img
        src={avatar}
        alt="avatar"
        className="w-[150px] h-[150px] rounded-full"
      />
      <h1>Mehdi Hasan Shohan</h1>
      <h3>mshohanhasan@gmail.com</h3>
      <button className=" mt-2 py-1 px-6 border-solid border-2 border-zinc-500 rounded-sm hover:bg-zinc-500">
        Edit profile
      </button>
    </div>
  );
};

export default ProfileInfo;
