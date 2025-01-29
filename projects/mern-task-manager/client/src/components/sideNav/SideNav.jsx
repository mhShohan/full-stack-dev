import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { id: 0, type: 'Dashboard', link: '/dashboard' },
  { id: 6, type: 'Create New Task', link: '/create' },
  { id: 1, type: 'All Tasks', link: '/all' },
  { id: 2, type: 'Completed', link: '/completed' },
  { id: 3, type: 'In Progress', link: '/inprogress' },
  { id: 4, type: 'Cancelled ', link: '/cancelled' },
];

const SideNav = () => {
  const { pathname } = useLocation();

  return (
    <ul className="p-12">
      {links.map((link) => (
        <Link to={link.link} key={link.id}>
          <li
            className={`px-2 border-solid 
          border-b-2 border-zinc-500 mb-3 
          cursor-pointer hover:bg-zinc-500 
          ease-in duration-300 ${pathname === link.link ? 'bg-zinc-500' : ''}`}
          >
            {link.type}
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default SideNav;
