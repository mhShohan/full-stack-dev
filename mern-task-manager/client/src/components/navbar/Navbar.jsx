import axios from 'axios';
import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/ContextProvider';

const Navbar = () => {
  const { state } = useContext(Context);

  console.log(state);

  async function logOut() {
    try {
      await axios.get(`${process.env.REACT_APP_URL}/user/logout`);
      window.location = '/';
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <nav className="flex flex-auto justify-end align-bottom px-6 py-2 text-zinc-300 ">
      <ul className="flex items-center ">
        <li className="mr-1 w-[40px] h-[40px]">
          <img
            src={state.user.avatar}
            alt="avatar"
            className="crop-img rounded-full cursor-pointer"
          />
        </li>
        <li className="mr-3 hover:text-zinc-50 capitalize">
          <Link to="/profile">{`${state.user.firstName} ${state.user.lastName}`}</Link>
        </li>
        <li className="mr-2 hover:text-zinc-50">
          <Link to="/logout" onClick={logOut}>
            Logout!
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
