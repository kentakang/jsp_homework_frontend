import { useState, useEffect, useCallback } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUrl = useCallback(
    async () => {
      const response = await fetch(url);
      const json = await response.json();

      setData(json);
      setLoading(false);
    },
    [url],
  );

  useEffect(() => {
    fetchUrl();
  }, [fetchUrl]);

  return [data, loading];
};

export { useFetch };