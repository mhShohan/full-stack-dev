import React from 'react';
import SinglePost from './SinglePost';

const Posts = ({ posts }) => {
  return (
    <div className="posts">
      {posts.map((post) => (
        <SinglePost key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
