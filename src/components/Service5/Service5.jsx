import React, { useEffect, useState } from "react";
import Style from "./service5.module.css";

export default function Service5() {
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
