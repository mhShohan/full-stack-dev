import React from 'react';
import { Link } from 'react-router-dom';

const SingleProduct = ({ product }) => {
  return (
    <div className="p-4 border border-zinc-500 rounded-md shadow-lg ">
      <h2 className="text-xl">Title: {product.title}</h2>
      <h3 className="text-xl">brand: {product.brand[0].name}</h3>
      <h4 className="text-xl">Category: {product.category[0].name}</h4>
      <h1 className="text-xl">Price: {product.price}</h1>
      <Link to={product._id}>
        <button className="mt-6 py-2 px-4 bg-zinc-800 text-yellow-50  font-bold rounded-md">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default SingleProduct;
