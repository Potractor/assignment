import React, { useState } from "react";

const InfiniteScrollTable = ({ list }) => {
  const [item, setItem] = useState(0);
  const filteredList = list.slice(item, 15 + item);
  const scrollHandler = (e) => {
    setItem(Math.floor(e.target.scrollTop / 80));
  };
  return (
    <div
      onScroll={scrollHandler}
      style={{
        height: "900px",
        width: "500px",
        overflow: "scroll",
        position: "relative",
      }}
    >
      <div
        style={{
          height: list.length * 80,
          backgroundColor: "white",
          position: "absolute",
          width: "100%",
          textAlign: "center",
          top: 80 * item,
        }}
      >
        {filteredList.map((item) => {
          return (
            <div
              style={{
                height: "80px",
                backgroundColor: "orange",
                color: "black",
              }}
              key={item}
            >
              Item {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InfiniteScrollTable;
