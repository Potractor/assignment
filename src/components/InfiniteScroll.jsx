import React from "react";
import { useTheme } from "../context/theme-context";
import InfiniteScrollTable from "./InfiniteScrollTable";
const InfiniteScroll = () => {
  const { webTheme, toggleTheme } = useTheme();
  const LIST = Array.from({ length: 10000 }, (_, i) => i);
  return (
    <>
      <div style={{ position: "relative" }}>
        <input
          className="toggle-switch"
          onChange={toggleTheme}
          style={{ position: "absolute", right: 0 }}
          type="checkbox"
        />
      </div>
      <InfiniteScrollTable list={LIST} />
    </>
  );
};

export default InfiniteScroll;
