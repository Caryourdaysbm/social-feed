// src/components/Feed.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';

// Main Feed Component
const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // Fetch posts from the API
  const fetchPosts = async (pageNumber) => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts`,
        {
          params: { _page: pageNumber, _limit: 10 },
        }
      );

      // Check if there are more posts to load
      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...response.data]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feed-container">
      <InfiniteScroll
        pageStart={0}
        loadMore={fetchPosts}
        hasMore={hasMore && !loading}
        loader={<LoadingSpinner key={0} />}
        threshold={200}
      >
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </InfiniteScroll>
      {!hasMore && posts.length > 0 && <p className="end-message">No more posts</p>}
    </div>
  );
};

// Post Component to Display Individual Posts
const Post = ({ post }) => (
  <div className="post">
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

// Loading Spinner Component
const LoadingSpinner = () => <div className="loading-spinner">Loading...</div>;

export default Feed;
