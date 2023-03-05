import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';
import Pagination from './components/Pagination';
import Posts from './components/Posts';

const App = () => {
  const pageNumber = parseInt(useParams().pageNumber) || 1;

  const [page, setPage] = useState(pageNumber);
  const [totalPages, setTotalPages] = useState(1);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:4000/api/v1/posts?page=${page}`
        );
        const { data, totalPages } = await res.json();

        setTotalPages(totalPages);
        setPosts(data);
        setLoading(false);
      } catch (error) {
        setError('Error!');
        setLoading(false);
      }
    };
    fetchPosts();
  }, [page]);
  return (
    <div className="app">
      <Pagination page={page} totalPages={totalPages} changePage={setPage} />
      <Posts posts={posts} />
      <Pagination page={page} totalPages={totalPages} changePage={setPage} />
    </div>
  );
};

export default App;
