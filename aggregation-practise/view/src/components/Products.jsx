import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SingleProduct from './SingleProduct';

const Products = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    (async () => {
      const url = `http://localhost:4000/api/v1/product`;
      try {
        const { data } = await axios.get(url);
        setProducts(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 my-8">
      {products &&
        products.map((prod) => <SingleProduct key={prod._id} product={prod} />)}
    </div>
  );
};

export default Products;
