import React, { useState, useContext } from 'react';
import uploadImg from '../assets/image/upload.webp';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../context/ContextProvider';

const ProfilePage = () => {
  const [file, setFile] = useState({});
  const location = useLocation();
  const [localState, setLocalState] = useState(location.state?.data);
  const { reRender } = useContext(Context);

  const handleInputChange = (e) => {
    setLocalState({
      ...localState,
      [e.target.name]: e.target.value,
    });
  };

  const updateAvatar = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const saveAvatar = async () => {
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL}/user/avatar-update`,
        formData
      );
      setLocalState({ ...localState, avatar: data.url });
      //   console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const updateProfile = async () => {
    await axios.patch(
      `${process.env.REACT_APP_URL}/user/update-profile`,
      localState
    );
    reRender();
    window.location = '/profile';
  };

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <div className="w-[300px] h-[300px]">
        <img
          src={localState.avatar}
          alt="pro pic"
          className="w-full rounded-full crop-img"
        />
      </div>
      <div className="flex mt-2 justify-center items-center">
        <div>
          <label
            htmlFor="avatar"
            className="flex w-[200px] justify-center items-center bg-white cursor-pointer"
          >
            <img src={uploadImg} alt="upload" className="w-[58px] mr-2" />{' '}
            Change Avatar
          </label>
          <input
            type="file"
            name="avatar"
            id="avatar"
            className="hidden"
            onChange={updateAvatar}
          />
        </div>
        <button
          onClick={saveAvatar}
          className="bg-green-700 py-2 px-6 text-gray-200 "
        >
          Save
        </button>
      </div>
      <div className="flex flex-col w-96 mt-4">
        <div className="flex w-96">
          <input
            type="text"
            className="mt-2 p-1 outline-0 rounded-sm w-48"
            placeholder="First Name"
            value={localState.firstName}
            onChange={handleInputChange}
            name="firstName"
          />
          <input
            type="text"
            className="mt-2 ml-4 p-1 outline-0 rounded-sm w-48"
            placeholder="Last Name"
            value={localState.lastName}
            onChange={handleInputChange}
            name="lastName"
          />
        </div>
        <input
          type="text"
          className="mt-2 p-1 outline-0 rounded-sm"
          placeholder="Title"
          value={localState.title}
          onChange={handleInputChange}
          name="title"
        />
        <textarea
          placeholder="Description"
          className="mt-2 p-1 outline-0 rounded-sm"
          value={localState.description}
          onChange={handleInputChange}
          name="description"
        ></textarea>
      </div>
      <button
        className="bg-green-700 py-2 px-6 text-gray-200 mt-2 rounded-sm"
        onClick={updateProfile}
      >
        Update
      </button>
    </div>
  );
};

export default ProfilePage;
