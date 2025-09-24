import React, { useEffect, useState } from "react";
import Style from "./services.module.css";

export default function Services() {
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
  <title>الخدمات</title>
  
  <!-- Tailwind -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Tajawal Font -->
  <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet">
  
  <style>
    body { font-family: 'Tajawal', sans-serif; }
  </style>
</head>
<body class="bg-white h-[95vh] flex flex-col items-center justify-center">

<!-- Welcome Section -->
<section class="text-center text-black mt-10 mb-[10px]">
  <h2 class="font-bold text-3xl mt-5  flex items-center justify-center gap-2 ">
    <img src="images/img13.png" alt="صورة المستخدم" class="w-10 h-10 rounded-full">
    <span>مرحباً عمرو سيد حسين</span>
  </h2>

  <!-- الأزرار -->
  <div class="flex flex-wrap justify-center gap-3 mt-7 mb-[10px]">
    <button onclick="window.location.href='service1.html'" class="bg-gradient-to-r from-[#0D8EFF] to-[#00FF84] text-white font-bold text-sm w-60 h-12 rounded-xl shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(13,142,255,0.6),0_0_30px_rgba(0,255,132,0.6)]">
      وصف الأماكن و الاشياء و الأشخاص
    </button>
    <button onclick="window.location.href='service2.html'" class="bg-gradient-to-r from-[#0D8EFF] to-[#00FF84] text-white font-bold text-sm w-60 h-12 rounded-xl shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(13,142,255,0.6),0_0_30px_rgba(0,255,132,0.6)]">
      الترجمة الفورية للغة للإشارة
    </button>
    <button onclick="window.location.href='service3.html'" class="bg-gradient-to-r from-[#0D8EFF] to-[#00FF84] text-white font-bold text-sm w-60 h-12 rounded-xl shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(13,142,255,0.6),0_0_30px_rgba(0,255,132,0.6)]">
      خدمة المرافقين
    </button>
    <button onclick="window.location.href='service4.html'" class="bg-gradient-to-r from-[#0D8EFF] to-[#00FF84] text-white font-bold text-sm w-60 h-12 rounded-xl shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(13,142,255,0.6),0_0_30px_rgba(0,255,132,0.6)]">
      خدمة التوصيل و تخليص الاوراق
    </button>
    <button onclick="window.location.href='service5.html'" class="bg-gradient-to-r from-[#0D8EFF] to-[#00FF84] text-white font-bold text-sm w-60 h-12 rounded-xl shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(13,142,255,0.6),0_0_30px_rgba(0,255,132,0.6)]">
      الدعم النفسي
    </button>
  </div>
</section>
    <!-- Services Section -->
<section class="container mx-auto my-8 px-4 mt-5 mb-[10px]">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

    <!-- الخدمة الأولى -->
    <div class="flex justify-start mt-[0px]">
      <div class="text-center w-[180px] h-[290px]">
        <img src="images/img4.jpg" class="w-[250px] h-[150px] object-cover mx-auto mb-3 rounded-lg" alt="service">
        <div class="flex justify-center mb-2">
          <img src="images/img12.png" class="w-10 h-10" alt="icon">
        </div>
        <p class="text-sm font-bold text-[#6B7280]">
          خلق بيئة آمنة ومنظمة للقاء بين المتطوعين والمستفيدين بما يضمن الاحترام والراحة للطرفين.
        </p>
      </div>
    </div>

    <!-- الخدمة الثانية -->
    <div class="flex justify-center mt-[0px]">
      <div class="text-center w-[180px] h-[290px]">
        <img src="images/img3.jpg" class="w-[250px] h-[150px] object-cover mx-auto mb-3 rounded-lg" alt="service">
        <div class="flex justify-center mb-2">
          <img src="images/img12.png" class="w-10 h-10" alt="icon">
        </div>
        <p class="text-sm font-bold text-[#6B7280]">
          تعزيز ثقافة التطوع في المجتمع وتحفيز الشباب على المشاركة الإيجابية.
        </p>
      </div>
    </div>

    <!-- الخدمة الثالثة -->
    <div class="flex justify-end mt-[0px]">
      <div class="text-center w-[180px] h-[290px]">
        <img src="images/img2.jpg" class="w-[250px] h-[150px] object-cover mx-auto mb-3 rounded-lg" alt="service">
        <div class="flex justify-center mb-2">
          <img src="images/img12.png" class="w-10 h-10" alt="icon">
        </div>
        <p class="text-sm font-bold text-[#6B7280]">
          تمكين ذوي الاحتياجات الخاصة عبر تعزيز استقلاليتهم وتقليل شعورهم بالعزلة.
        </p>
      </div>
    </div>

  </div>
</section>

</body>
</html>
    </>
  );
}
