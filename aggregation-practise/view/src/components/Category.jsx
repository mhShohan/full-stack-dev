import axios from 'axios';
import React, { useState } from 'react';

const Category = () => {
  const [category, setCategory] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const url = `http://localhost:4000/api/v1/category`;
      await axios.post(url, { name: category });
      setCategory('');
      console.log('New category Created!');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div className="mt-20 w-[400px] p-8 border border-zinc-800 ">
        <h2 className="text-3xl font-semibold py-2">Create New Category</h2>
        <form className="flex" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="New Category Name"
            className="py-2 px-2 outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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

export default Category;
