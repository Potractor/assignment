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
  const height = useRef(0);
  console.log(height);
  const {
    filteredProducts,
    setFilteredProducts,
    favourites,
    setFavourites,
    loading,
    setLoading,
    setPageNo,
    pageNo,
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

  useEffect(() => {
    console.log(pageNo, " pageNo");
    console.log(height.current, " height");
    window.scrollTo({
      top: 2000,
      behavior: "smooth",
    });
  }, [pageNo]);

  const sortHandler = useCallback((isAscending) => {
    let currProducts = [...filteredProducts];
    currProducts.sort((a, b) => {
      return isAscending ? a.price - b.price : b.price - a.price;
    });
    setFilteredProducts(currProducts);
  });
  const renderProducts = filteredProducts.filter((product) =>
    product?.customerName?.toLowerCase()?.includes(query.toLowerCase()),
  );
  const scrollHandler = (e) => {
    if (
      e.target.offsetHeight + e.target.scrollTop >
      e.target.scrollHeight * 0.5
    ) {
      console.log(e.target.scrollTop);
      height.current = e.target.scrollTop;
      setPageNo((page) => page + 1);
    }
  };

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
          style={{
            cursor: "pointer",
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
      {/* {!loading && renderProducts.length === 0 && <div>No Products found</div>} */}
      <div onScroll={scrollHandler} className="main-content">
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
    </div>
  );
};

export default ProductsList;
