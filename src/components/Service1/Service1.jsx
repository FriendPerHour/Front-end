import React, { useEffect, useState } from "react";
import Style from "./service1.module.css";

export default function Service1() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    // Side effect logic here
  }, []);

  return (
    <>
      <h1>Template Name</h1>
    </>
  );
}
