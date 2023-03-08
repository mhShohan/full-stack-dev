import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [review, setReview] = useState('');
  const [ratings, setRatings] = useState('');
  const [reRender, setReRender] = useState(false);
  const [avgRating, setAvgRating] = useState(0);
  const [allReview, setAllReview] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = `http://localhost:4000/api/v1/product/${id}`;
      await axios.post(url, {
        description: review,
        rating: parseFloat(ratings),
      });
      console.log('Reviewed');
      setReview('');
      setRatings('');
      setReRender((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      const url = `http://localhost:4000/api/v1/product/${id}`;
      try {
        const { data } = await axios.get(url);
        setProduct(data.data);
        setAllReview(data.data.reviews);
        if (data.data.reviews.length === 0) {
          setAllReview(null);
        }
        const total =
          data.data.reviews.length > 0 &&
          data.data.reviews.reduce((acc, cur) => {
            acc += cur.rating;
            return acc;
          }, 0);
        setAvgRating(total / data.data.reviews.length);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [reRender]);
  return (
    <div>
      <div className="grid grid-cols-2 gap-8 mt-5">
        <div className="border p-4">
          {product && (
            <>
              <h2 className="text-xl">Title: {product.title}</h2>
              <h3 className="text-xl">brand: {product.brand[0].name}</h3>
              <h4 className="text-xl">Category: {product.category[0].name}</h4>
              <h1 className="text-xl">Price: {product.price}</h1>
              <h1 className="text-xl">Ratings: {avgRating}</h1>
            </>
          )}
        </div>
        <form className="border p-4" onSubmit={handleSubmit}>
          <div className="flex mt-4">
            <label className="w-1/4 text-2xl">Review:</label>
            <input
              type="text"
              placeholder="your review"
              className="w-3/4 p-2 rounded-md outline-none"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>
          <div className="flex mt-4">
            <label className="w-1/4 text-2xl">Ratings:</label>
            <input
              type="text"
              placeholder="your rating about this product"
              className="w-3/4 p-2 rounded-md outline-none"
              value={ratings}
              onChange={(e) => setRatings(e.target.value)}
            />
          </div>
          <div className="mt-3 flex justify-center items-center">
            <button
              type="submit"
              className="px-5 py-2 bg-zinc-700 text-zinc-300 font-bold"
            >
              Review
            </button>
          </div>
        </form>
      </div>
      <div className="flex justify-center items-center mt-8">
        <ul className="w-[500px]">
          {allReview &&
            allReview.map((review) => (
              <li
                key={review._id}
                className="flex justify-between border p-4 mb-4"
              >
                <span>Review: {review.description}</span>
                <span>Ratings: {review.rating}</span>
              </li>
            ))}
          {!allReview && (
            <li className="flex justify-between border p-4 mb-4">
              No reviews found
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProductDetails;
