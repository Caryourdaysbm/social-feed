import React from 'react';
import PropTypes from 'prop-types';

const Post = ({ post }) => (
  <div style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
    <h3>{post.title}</h3>
    <p>{post.body}</p>
  </div>
);

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export default Post;
