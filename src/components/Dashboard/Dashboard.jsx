import React, { useEffect, useState } from "react";
import Style from "./dashboard.module.css";

export default function Dashboard() {
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
