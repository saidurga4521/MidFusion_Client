
import { useState, useCallback } from "react";
import axios from "axios";

const useMutation = (url, method = "post", options = {}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  const mutate = useCallback(
    async (body = null, extraOptions = {}) => {
      setIsLoading(true);
      setError(null);
      setIsError(false);

      try {
        const response = await axios({
          url,
          method,
          data: body,
          ...options,
          ...extraOptions, // override if needed
        });
        setData(response.data);
        return response.data;
      } catch (err) {
        setError(err);
        setIsError(true);
        throw err; // so caller can handle error if needed
      } finally {
        setIsLoading(false);
      }
    },
    [url, method, options]
  );

  return { mutate, data, isLoading, error, isError };
};

export default useMutation



/*
const { mutate } = useApiMutation(
  "https://jsonplaceholder.typicode.com/users/1",
  "delete"
);

const handleDelete = () => {
  mutate();
};

*/