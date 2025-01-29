import React from 'react';
import { useContext } from 'react';
import DashboardCard from '../components/DashboardCard';
import { Context } from '../context/ContextProvider';

const Dashboard = () => {
  const {
    state: { tasks },
  } = useContext(Context);
  return (
    <div className="w-full h-full bg-zinc-400 p-8 flex flex-wrap">
      <DashboardCard title="Total Tasks" count={tasks.length} />
      <DashboardCard
        title="Completed Tasks"
        count={tasks.filter((t) => t.status === 'COMPLETED').length}
      />
      <DashboardCard
        title="In Progress Tasks"
        count={tasks.filter((t) => t.status === 'INPROGRESS').length}
      />
      <DashboardCard
        title="Cancelled Tasks"
        count={tasks.filter((t) => t.status === 'CANCELLED').length}
      />
    </div>
  );
};

export default Dashboard;
