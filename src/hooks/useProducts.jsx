import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
export const useProducts = ({ onlyFavourites }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem("favourites")) ?? [],
  );
  const first = useRef();
  first.current = 0;
  useEffect(() => {
    fetchHandler(pageSize, pageNo);
  }, [pageNo, pageSize]);

  const fetchHandler = async (pageSize, pageNo) => {
    first.current = 1;
    try {
      setLoading((loading) => loading + 1);
      const resp = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/order/all?pageSize=${pageSize}&pageNo=${pageNo}`,
      );
      let data = resp.data;
      if (onlyFavourites) {
        data = data.filter((item) =>
          favourites.find((each) => each?.id == item?.id && each?.toggled),
        );
      }
      setFilteredProducts((prevData) => [...prevData, ...data]);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading((loading) => loading - 1);
    }
  };
  return {
    filteredProducts,
    setFilteredProducts,
    loading,
    setLoading,
    favourites,
    setFavourites,
    setPageNo,
    setPageSize,
    pageNo,
  };
};
