import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import LoadingSpinner from "./loadingSpinner"; // Importing the spinner component

// Updated fetch function to get data from a mock API (JSONPlaceholder)
const fetchItems = async (page) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=1`
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
  const [error, setError] = useState(null); // State to handle error messages

  // Function to load more items on scroll
  const loadMoreItems = async () => {
    if (loading) return; // Prevent multiple fetches at once

    setLoading(true);
    setError(null); // Reset error state before fetching
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
      setError("Failed to load data. Please try again.");
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
        loader={<LoadingSpinner key={0} />} // Use LoadingSpinner while loading
      >
        {items.map((item, index) => (
          <div
            key={`${index}-${item.id}`}
            className="border rounded-md bg-[#e0e0e0] shadow-myShadow mt-60 m-5 md:ml-40 md:mr-40 flex flex-col justify-center align-middle p-12 pl-6 pr-6  md:pl-40 md:pr-40"
          >
            <h4 className="font-bold text-center">{item.title}</h4>
            <p className="text-center">{item.body}</p>
            

          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Feed;
