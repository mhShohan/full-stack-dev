import React, { useState } from 'react';
import axios from 'axios';

const Brands = () => {
  const [brand, setBrand] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const url = `http://localhost:4000/api/v1/brand`;
      await axios.post(url, { name: brand });
      setBrand('');
      console.log('New Brand Created!');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div className="mt-20 w-[400px] p-8 border border-zinc-800 ">
        <h2 className="text-3xl font-semibold py-2">Create New Brand</h2>
        <form className="flex" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="New Brand Name"
            className="py-2 px-2 outline-none"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          <input
            type="submit"
            value="Add"
            className="py-2 px-5 bg-sky-500 rounded-sm cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default Brands;
