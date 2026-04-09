import React from "react";
import ProductsList from "../components/ProductsList";

const Favourites = () => {
  return <ProductsList onlyFavourites={true} />;
};

export default Favourites;
