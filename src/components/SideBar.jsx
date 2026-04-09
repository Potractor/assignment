import React from "react";
import { Link } from "react-router-dom";
const SideBar = () => {
  return (
    <div className="sidebar">
      <div>
        <Link to="/">Products</Link>
      </div>
      <div>
        <Link to="/favourites">Favourites</Link>
      </div>
      <div>Cart</div>
      <div>Orders</div>
    </div>
  );
};

export default SideBar;
