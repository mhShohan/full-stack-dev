import React from 'react';

const DashboardCard = ({ title, count }) => {
  return (
    <div
      className="border-solid border-2 
    border-zinc-600 w-52 h-32 mr-4 flex 
    flex-col items-center justify-center rounded-sm
    "
    >
      <h1 className="text-2xl">{title}</h1>
      <h1 className="text-3xl">{count}</h1>
    </div>
  );
};

export default DashboardCard;
