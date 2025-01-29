import { Container, TextField, Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CreateBootcamp = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const post = {
      name,
      description,
      rating: parseFloat(rating),
      price: parseFloat(price),
    };
    try {
      await axios.post('http://localhost:4000/api/v1/bootcamps', post);
      setName('');
      setDescription('');
      setRating(0);
      setPrice(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <div className="flex">
        <form onSubmit={handleSubmit}>
          <TextField
            size="small"
            id="name"
            label="Name"
            variant="outlined"
            color="secondary"
            type="text"
            className="input"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            size="small"
            id="description"
            label="Description"
            variant="outlined"
            color="secondary"
            type="text"
            className="input"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            size="small"
            id="rating"
            label="Rating"
            variant="outlined"
            color="secondary"
            type="number"
            required
            className="input"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <TextField
            size="small"
            id="price"
            label="Price"
            variant="outlined"
            color="secondary"
            type="number"
            className="input"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Button variant="contained" type="submit" color="secondary">
            Add
          </Button>
        </form>
      </div>
      <div className="flex">
        <Link to="/" className="btn">
          Go to Homepage
        </Link>
      </div>
    </Container>
  );
};

export default CreateBootcamp;
