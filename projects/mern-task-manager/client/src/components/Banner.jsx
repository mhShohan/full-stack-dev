import React from 'react';

const Banner = ({ image }) => {
  return (
    <div className="flex-1 w-32 flex flex-col items-center justify-center h-screen">
      <img src={image} alt="homepage" className="w-[300px]" />
      <h1 className="text-4xl">Welcome to Task Manager...</h1>
      <h3>Create Your account & save your all Tasks..</h3>
    </div>
  );
};

export default Banner;
