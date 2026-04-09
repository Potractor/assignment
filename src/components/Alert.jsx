import React, { useEffect, useState } from "react";
const Alert = ({
  message = "This is custom alert",
  variant = "green",
  timeout = 3000,
}) => {
  // Online Javascript Editor for free
  // Write, Edit and Run your Javascript code using JS Online Compiler

  const obj = {
    x: 10,
    say: function () {
      console.log(this);
    },
  };

  function fun(demo) {
    return (x) => {
      demo();
    };
  }
  let a = fun(obj.say);
  a(10);
  a();
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
    let timer;
    if (timeout !== -1) {
      timer = setTimeout(() => {
        setShow(false);
      }, timeout);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [message]);
  if (show)
    return (
      <div className="alert-container">
        <div className="custom-alert">{message}</div>
      </div>
    );
};

export default Alert;
