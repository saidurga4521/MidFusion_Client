import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useFetch = (url, { fetchOnMount = true, options = {} } = {}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(fetchOnMount);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    if (!url) return;
    setIsLoading(true);
    setError(null);
    setIsError(false);

    try {
      const response = await axios.get(url, options);
      setData(response.data);
    } catch (err) {
      setError(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    if (fetchOnMount) {
      fetchData();
    }
  }, [fetchOnMount, fetchData]);

  // Refetch function to manually trigger data fetching
  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, error, isError, refetch };
};

export default useFetch;


/*

import React from "react";
import useFetch from "./useFetch";

const UsersList = () => {
  const { data, isLoading, error, isError, refetch } = useFetch(
    "https://jsonplaceholder.typicode.com/users",
    { fetchOnMount: true } // set to false if you want manual control
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return (
    <div>
      <p>Error: {error.message}</p>
      <button onClick={refetch}>Retry</button>
    </div>
  );

  return (
    <div>
      <button onClick={refetch}>Refresh Data</button>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;

*/