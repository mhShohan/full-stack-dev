import React from 'react';
import DashboardCard from '../components/DashboardCard';

const Dashboard = () => {
  return (
    <div className="w-full h-full bg-zinc-400 p-8 flex flex-wrap">
      <DashboardCard title="Total Tasks" count={100} />
      <DashboardCard title="Completed Tasks" count={100} />
      <DashboardCard title="Pending Tasks" count={100} />
      <DashboardCard title="Canceled Tasks" count={100} />
    </div>
  );
};

export default Dashboard;
