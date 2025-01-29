import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="p-6 bg-slate-800 text-gray-400 font-bold flex justify-center items-center">
      <ul className="flex gap-x-6">
        <li>
          <Link to="/brand">Brand</Link>
        </li>
        <li>
          <Link to="/category">Category</Link>
        </li>
        <li>
          <Link to="/create-product">Create product</Link>
        </li>
        <li>
          <Link to="/">Products</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
