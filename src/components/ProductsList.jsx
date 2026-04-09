import React, {
  useCallback,
  useMemo,
  useEffect,
  useState,
  useRef,
} from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { useProducts } from "../hooks/useProducts";
const ProductsList = ({ onlyFavourites }) => {
  const abortControllerRef = useRef(null);
  const {
    filteredProducts,
    setFilteredProducts,
    favourites,
    setFavourites,
    loading,
    setLoading,
  } = useProducts({ onlyFavourites });
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (onlyFavourites) {
      if (onlyFavourites) {
        const data = filteredProducts.filter((item) =>
          favourites.find((each) => each?.id == item?.id && each?.toggled),
        );
        setFilteredProducts(data);
      }
    }
  }, [favourites]);

  const sortHandler = useCallback((isAscending) => {
    let currProducts = [...filteredProducts];
    currProducts.sort((a, b) => {
      return isAscending ? a.price - b.price : b.price - a.price;
    });
    setFilteredProducts(currProducts);
  });
  const renderProducts = filteredProducts.filter((product) =>
    product?.title?.toLowerCase()?.includes(query.toLowerCase()),
  );

  function debounce(func, delay) {
    let timer;
    return function (args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(args);
      }, delay);
    };
  }
  const x = useCallback(
    debounce((val) => {
      console.log(val);
    }, 1000),
    [],
  );
  // (val) => {
  //   // return debounce((val) => {
  //   //   console.log(val);
  //   // }, 3000)(val);
  //   const x = (a) => {
  //     console.log(a);
  //   };
  //   x(val);
  // };
  return (
    <div>
      <div className="search">
        <input
          type="text"
          onChange={async (e) => {
            const value = e.target.value;
            setQuery(e.target.value);
            x();
          }}
        />
        {/* <button onClick={clickHandler}>search</button> */}
        <button
          onClick={(e) => {
            sortHandler(true);
          }}
        >
          sort ascending
        </button>
        <button
          onClick={() => {
            sortHandler(false);
          }}
        >
          sort descending
        </button>
      </div>
      {loading > 0 && <div>Loading...</div>}
      {!loading && renderProducts.length === 0 && <div>No Products found</div>}
      {!loading && (
        <div className="main-content">
          {renderProducts?.map((product) => {
            return (
              <ProductCard
                key={product?.id}
                {...product}
                favourites={favourites}
                setFavourites={setFavourites}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductsList;
