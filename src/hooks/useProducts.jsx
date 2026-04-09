import React, { useState, useEffect } from "react";
import axios from "axios";
export const useProducts = ({ onlyFavourites }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(0);
  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem("favourites")) ?? [],
  );
  useEffect(() => {
    fetchHandler();
  }, []);
  const fetchHandler = async () => {
    try {
      setLoading((loading) => loading + 1);
      const resp = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/order/all`,
      );
      let data = resp.data;
      if (onlyFavourites) {
        data = data.filter((item) =>
          favourites.find((each) => each?.id == item?.id && each?.toggled),
        );
      }
      setFilteredProducts(data);
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
  };
};
