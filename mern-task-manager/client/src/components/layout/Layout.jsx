import React from 'react';
import Navbar from '../navbar/Navbar';
import ProfileInfo from '../ProfileInfo';
import SideNav from '../sideNav/SideNav';
import { Link } from 'react-router-dom';
import Footer from '../Footer';

const Layout = ({ children }) => {
  return (
    <>
      <header className="flex bg-zinc-700 border-solid border-b-2 border-zinc-500">
        <div className="flex-auto px-6 py-2">
          <Link to="/dashboard">
            <h1 className="text-3xl text-zinc-300">MERN Task Manager!</h1>
          </Link>
        </div>
        <Navbar />
      </header>
      <main className="flex">
        <aside className="bg-zinc-700 w-[300px] min-h-screen text-zinc-300">
          <ProfileInfo />
          <SideNav />
        </aside>
        <section className="bg-zinc-400 flex-1">{children}</section>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
