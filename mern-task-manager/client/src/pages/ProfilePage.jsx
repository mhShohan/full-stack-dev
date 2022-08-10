import React from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/image/avatar.png';

const ProfilePage = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <div className="w-[300px] h-[300px]">
        <img src={img} alt="pro pic" className="w-full rounded-full" />
      </div>
      <div>
        <h1 className="text-4xl">Mehdi Hasan Shohan</h1>
        <p className="text-sm text-zinc-700">mshohanhasan@gmail.com</p>
      </div>
      <h2>Programmer || Learner || Web Developer Enthusiast (MERN Stack)</h2>
      <p className="w-[600px] mt-4 text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam sint
        facilis accusantium eos sunt nemo doloremque amet. Cum assumenda
        corrupti, neque ipsum aut maiores soluta vel odit fuga quo ratione.
      </p>
      <Link
        to="/edit-profile"
        className=" mt-2 py-1 px-6 border-solid border-2 border-zinc-600 rounded-sm hover:bg-zinc-600"
      >
        Edit Profile
      </Link>
    </div>
  );
};

export default ProfilePage;
