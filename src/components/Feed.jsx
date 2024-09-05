import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";

// Updated fetch function to get data from a mock API (JSONPlaceholder)
const fetchItems = async (page) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const Feed = () => {
  const [items, setItems] = useState([]); // State to hold the fetched items
  const [page, setPage] = useState(1); // State to keep track of the current page
  const [hasMore, setHasMore] = useState(true); // State to check if there are more items to load
  const [loading, setLoading] = useState(false); // State to handle loading status

  // Function to load more items on scroll
  const loadMoreItems = async () => {
    if (loading) return; // Prevent multiple fetches at once

    setLoading(true);
    try {
      const data = await fetchItems(page);
      setItems((prevItems) => [...prevItems, ...data]);
      setPage((prevPage) => prevPage + 1);

      // Update hasMore based on the length of the returned data
      if (data.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial load
    loadMoreItems();
  }, []);

  return (
    <div className="feed">
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMoreItems}
        hasMore={hasMore && !loading}
        loader={<div className="loader" key={0}>Loading ...</div>}
      >
        {items.map((item, index) => (
          <div key={`${index}-${item.id}`} className="item">
            <h4>{item.title}</h4>
            <p>{item.body}</p>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Feed;
