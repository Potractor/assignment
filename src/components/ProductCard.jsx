import React, { useState, useCallback } from "react";
import Alert from "./Alert";
const ProductCard = ({
  id,
  image,
  customerName,
  amount,
  deleteHandler,
  favourites,
  setFavourites,
}) => {
  const [alert, setAlert] = useState({ message: "" });
  const favouriteHandler = (id, toggled) => {
    setAlert({ message: "" });
    let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    favourites = favourites.filter((item) => item?.id !== id);
    favourites = [...favourites, { id, toggled }];
    setFavourites(favourites);
    favourites = JSON.stringify(favourites);
    localStorage.setItem("favourites", favourites);
    if (toggled) setAlert({ ...alert, message: "Added to favourites" });
    else setAlert({ ...alert, message: "Item removed from favourites" });
  };

  return (
    <div className="product-card" key={id}>
      <img src={image} />
      <div>{customerName}</div>
      <div>price - {amount} $</div>
      <div>
        <input
          type="checkbox"
          onChange={(e) => {
            favouriteHandler(id, e.target.checked);
          }}
          style={{ cursor: "pointer" }}
          checked={favourites.find((item) => item?.id == id)?.toggled}
        />{" "}
        favourite
      </div>
      <button
        onClick={() => {
          deleteHandler(id);
        }}
      >
        Add to cart
      </button>
      {alert?.message && <Alert {...alert} />}
    </div>
  );
};

export default React.memo(ProductCard);
