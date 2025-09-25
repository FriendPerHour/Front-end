import React, { useEffect, useState } from "react";
import Style from "./waiting.module.css";

export default function Waiting() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    // Side effect logic here
  }, []);

  return (
    <>
      

  <!-- المحتوى داخل الصفحة -->
  <div class="text-center p-2">
    <div class="flex justify-center ">
      <img src="images/waiting.png" alt="وقت الانتظار" class="max-w-xs max-h-x">
    </div>

    <p class="text-4xl font-semibold bg-gradient-to-r from-[#0D8EFF] to-[#00FF84] bg-clip-text mt-4 mb-6 text-transparent p-4">
  من فضلك انتظر رد المتطوع
   </p>


  </div>

    </>
  );
}
