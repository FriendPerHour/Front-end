import React, { useEffect, useState } from "react";
import Style from "./service1.module.css";

export default function Service1() {
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
  <title>وصف الأماكن و الأشياء و الأشخاص</title>

  <!-- Tailwind -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- ResponsiveVoice -->
  <script src="https://code.responsivevoice.org/responsivevoice.js?key=D6Pcv6Dj"></script>

  <!-- Tajawal Font -->
  <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet">

  <style>
    body {
      font-family: 'Tajawal', sans-serif;
    }
  </style>
</head>
<body class="bg-white flex items-center justify-center flex-col min-h-screen">

  <div class="w-full px-6">

    <!-- Welcome Section -->
    <section class="text-center text-black">
      <h2 class="font-bold text-4xl mt-5 mb-3">وصف الأماكن و الأشياء و الأشخاص</h2>

      <!-- نص و صورة جنب بعض -->
      <div class="flex flex-col md:flex-row justify-between items-start gap-8 mt-6">

        <!-- العمود الأيمن (النص + أزرار) -->
        <div class="flex-1 text-right" >

          <!-- الأزرار -->
          <div class="flex justify-center flex-wrap gap-7 mb-5 ml-40">
            <button class="bg-gradient-to-r from-[#0D8EFF] to-[#00FF84] text-white font-bold text-lg px-10 py-2 rounded-lg mt-3  transition hover:scale-105 shadow mx-auto">

              اطلب مساعدة
            </button>
            <button onclick="window.location.href='Transactions.html'" class="bg-gradient-to-r from-[#0D8EFF] to-[#00FF84] text-white font-bold text-lg px-10 py-2 rounded-lg mt-3  ml-10 hover:scale-105 shadow mx-auto">
              سجل المعاملات
            </button>
          </div>

          <!-- التقييم -->
          <p class="text-lg font-semibold flex items-center gap-2 text-[#6B7280] justify-end mb-4 ml-80">
            <img src="images/star.png" alt="service" class="w-6 h-6">
            5<span id="user-rating">/4.8</span> تقييم المستخدمين
          </p>

          <!-- الفقرات -->
          <p class="text-lg leading-relaxed mb-2">الخدمة موجهة خصيصًا لدعم ذوي الإعاقات البصرية 
          أو من يواجهون صعوبة في التعرّف على الأماكن والأشياء من حولهم.</p>

          <p class="text-lg leading-relaxed mb-2">تتيح هذه الخدمة للمستفيد طلب متطوع لمدة ساعة ليقوم بـ:</p>

          <p class="text-lg leading-relaxed mb-2">1- وصف الأماكن: مثل الشوارع، المكاتب، القاعات أو أي بيئة جديدة يحتاج الشخص للتعامل معها.</p>
          <p class="text-lg leading-relaxed mb-2">2- شرح التفاصيل: مثل ألوان الملابس، محتويات غرفة، أو ترتيب الأدوات.</p>
          <p class="text-lg leading-relaxed">3- المساعدة في التوجيه: إرشاد المستفيد إلى الاتجاهات الصحيحة أثناء التنقل. توفير دعم إنساني مباشر يشعر الشخص بالأمان والثقة.</p>
        </div>

        <!-- العمود الأيسر (الصورة) -->
        <div class="flex-1 flex justify-center">
          <img src="images/img5.jpg" alt="service" class="mr-72 w-[350px] h-[350px] object-cover rounded-lg shadow-lg">
        </div>

      </div>
    </section>
  </div>

  <script>
    // التنقل بين الصفحات
    document.querySelector(".Transactions").addEventListener("click", function(){
      window.location.href = "Transactions.html";
    });

    // تغيير قيمة التقييم
    var userRating = 4.8;
    document.getElementById("user-rating").textContent = userRating;
  </script>

</body>
</html>
    </>
  );
}
