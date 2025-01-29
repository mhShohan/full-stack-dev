import React from 'react';

const SinglePost = ({ post }) => {
  return (
    <div className="singlePost">
      <h4>{post.title}</h4>
      <h5>{post.author}</h5>
      <p>{post.body}</p>
    </div>
  );
};

export default SinglePost;
