import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CreateProduct = () => {
  const [allBrands, setAllBrands] = useState(null);
  const [allCategories, setAllCategories] = useState(null);
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const selectedBrand = allBrands.find((br) => br.name === brand);
    const selectedCategory = allCategories.find((br) => br.name === category);

    const newProduct = {
      title,
      brand_id: selectedBrand._id,
      category_id: selectedCategory._id,
      price: parseFloat(price),
    };
    try {
      const url = `http://localhost:4000/api/v1/product`;
      await axios.post(url, newProduct);
      console.log('new product create!');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async function () {
      const url = `http://localhost:4000/api/v1/`;
      try {
        const brands = await axios.get(url + 'brand');
        setAllBrands(brands.data.data);
        const categories = await axios.get(url + 'category');
        setAllCategories(categories.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="flex justify-center items-center">
      <div>
        <h2 className="text-3xl mt-6 text-center">Create New Product</h2>
        <form className="w-[500px] mt-10" onSubmit={handleSubmit}>
          <div className="flex mt-4">
            <label className="w-1/4 text-2xl">Title:</label>
            <input
              type="text"
              placeholder="product title"
              className="w-3/4 p-2 rounded-md outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex mt-4">
            <label className="w-1/4 text-2xl">Brand:</label>
            <select
              className="w-3/4 p-2 rounded-md outline-none"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            >
              <option value="">select brand</option>
              {allBrands &&
                allBrands.map((b) => (
                  <option key={b._id} value={b.name}>
                    {b.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex mt-4">
            <label className="w-1/4 text-2xl">Category:</label>
            <select
              className="w-3/4 p-2 rounded-md outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">select category</option>
              {allCategories &&
                allCategories.map((b) => (
                  <option key={b._id} value={b.name}>
                    {b.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex mt-4">
            <label className="w-1/4 text-2xl">Price:</label>
            <input
              type="text"
              placeholder="product title"
              className="w-3/4 p-2 rounded-md outline-none"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mt-3 flex justify-center items-center">
            <button className="px-5 py-2 bg-zinc-700 text-zinc-300 font-bold">
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
