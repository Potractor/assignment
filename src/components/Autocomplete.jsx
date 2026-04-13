import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
const initialOptions = ["ravi", "paramesh", "hello", "adhi"];
const Autocomplete = () => {
  const [name, setName] = useState("");
  const [options, setOptions] = useState(initialOptions);
  const [viewOptions, setViewOptions] = useState(false);
  const controllerRef = useRef(null);
  const timerRef = useRef(null);
  controllerRef.current = new AbortController();
  console.log(controllerRef.current);
  function useDebounce(callback, delay) {
    const debouncedFn = useCallback(
      (...args) => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        if (controllerRef.current) {
          controllerRef.current.abort();
        }

        timerRef.current = setTimeout(() => {
          callback(...args);
        }, delay);
      },
      [callback, delay],
    );
    return debouncedFn;
  }

  const fetchData = async (val) => {
    try {
      // if (controllerRef.current) {
      //   controllerRef.current.abort();
      // }
      const resp = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/order/search?name=${val}`,
        { signal: controllerRef.current.signal },
      );
      setOptions(resp.data);
    } catch (e) {
      console.log(e);
    }
  };
  const debouncefunction = useDebounce(fetchData, 500);
  const changeHandler = async (e) => {
    const val = e.target.value;
    setName(val);
    debouncefunction(val);
  };
  return (
    <div>
      <input
        className="input-box"
        onChange={changeHandler}
        onBlur={(e) => {
          setViewOptions(false);
        }}
        onFocus={(e) => {
          setViewOptions(true);
        }}
        value={name}
        type="text"
      />
      <div
        className="options-list "
        style={options.length === 0 ? { minHeight: 100 } : {}}
        style={viewOptions ? {} : { display: "none" }}
      >
        {options.map((option) => {
          return (
            <React.Fragment key={option}>
              <li className="option" value={option}>
                {option}
              </li>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Autocomplete;
