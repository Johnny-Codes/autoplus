import React, { useState, useEffect } from "react";

export default function useApi(props) {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const url = props.url;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setData(data);
      console.log("data", data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return data;
}
