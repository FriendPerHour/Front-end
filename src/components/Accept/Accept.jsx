import React, { useEffect, useState } from "react";
import Style from "./accept.module.css";

export default function Accept() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    // Side effect logic here
  }, []);

  return (
    <>
      <!DOCTYPE html>
<html lang="ar" dir="rtl">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>تم قبول طلبك</title>

  <!-- إضافة Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>

  <style>
    body {
      font-family: 'Tajawal', sans-serif;
    }
  </style>
</head>

<body class="bg-white flex justify-center items-center min-h-screen">

  <!-- المحتوى الكامل للصفحة -->
    <div class="bg-white p-4 justify-center rounded-lg shadow-lg space-y-2 border-4 rounded-full border-[#0D8EFF]">
    <h2 class="text-2xl font-semibold text-black mr-10 mb-2">تم قبول طلبك</h2>
    <p class="text-[#6B7280] mb-2 mr-6">اسم المتطوع:- علي عبدالله حسين</p>
    
    <p class="text-[#6B7280] mb-2 mr-6">الخبرة:- تاريخ لجمعية الرسالة</p>
    <p class="text-[#6B7280] relative pl-6 mr-10">
        <img src="images/star.png" alt="service"
          class="absolute left-52 top-1/2 transform -translate-y-1/2 w-6 h-6 z-0">
        <span id="user-rating">5</span> /<span>4.8</span> تقييم المستخدمين
      </p>
    <!-- الأزرار -->
<div class="flex gap-4 justify-center space-x-2">
  <button id="rejectBtn" class="bg-gradient-to-r from-[#0D8EFF] to-[#00FF84] text-white font-bold text-lg px-4 py-2 rounded-lg hover:scale-105 shadow w-28">
    غير موافق
  </button>
  <button id="acceptBtn" class="bg-gradient-to-r from-[#0D8EFF] to-[#00FF84] text-white font-bold text-lg px-4 py-2 rounded-lg hover:scale-105  shadow w-28">
    موافق
  </button>
</div>

  </div>

  <script>
    // إغلاق التنبيه عند الضغط على الأزرار
    document.getElementById('rejectBtn').onclick = function () {
      alert('تم رفض الطلب');
    };

    document.getElementById('acceptBtn').onclick = function () {
      alert('تم قبول الطلب');
    };
  </script>

</body>

</html>
    </>
  );
}
