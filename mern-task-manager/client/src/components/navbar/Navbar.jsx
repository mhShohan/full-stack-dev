import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../../assets/image/avatar.png';

const Navbar = () => {
  return (
    <nav className="flex flex-auto justify-end align-bottom px-6 py-2 text-zinc-300 ">
      <ul className="flex items-center ">
        <li className="mr-1">
          <img
            src={avatar}
            alt="avatar"
            className="w-[40px] h-[40px] rounded-full cursor-pointer"
          />
        </li>
        <li className="mr-3 hover:text-zinc-50">
          <Link to="/profile">Mehdi Hasan Shohan</Link>
        </li>
        <li className="mr-2 hover:text-zinc-50">
          <Link to="/logout">Logout!</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
