import { useState, useEffect } from "react";

export function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        if (delay === 0) {
            // immediate update if delay = 0
            setDebouncedValue(value);
            return;
        }

        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}

//   const [query, setQuery] = useState("");
//   const [fi, setQuery] = useState("");
//   const debouncedQuery = useDebounce(query, 500); // wait 500ms after typing
//   const debouncedFilter = useDebounce(fi, 500); // wait 500ms after typing

//   useEffect(() => {
//     if (debouncedQuery) {
//       console.log("Searching for:", debouncedQuery);
      // call API: fetch(`/api/search?q=${debouncedQuery}`)
//     }
//   }, [debouncedQuery]);