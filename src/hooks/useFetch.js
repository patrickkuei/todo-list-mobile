import React, { useEffect, useState } from 'react';
import axios from 'axios';

function useFetch(url, dependencies) {
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const controller = new AbortController();

  useEffect(() => {
    const get = async () => {
      setIsLoading(true);

      try {
        const { data } = await axios.get(url, {
          signal: controller.signal,
        });
        setResponse(data);
        setIsLoading(false);
      } catch (error) {
        controller.abort();
      }
    };

    get();

    return () => {
      controller.abort();
    };
  }, dependencies);

  return {
    data: response,
    upateData: (value) => setResponse(value),
    isLoading,
  };
}

export default useFetch;
