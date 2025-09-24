import React, { useEffect, useState } from "react";
import Style from "./service5.module.css";

export default function Service5() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    // Side effect logic here
  }, []);

  return (
    <>
      
  <div class="w-full px-6">

    <!-- Welcome Section -->
    <section class="text-center text-black">
      <h2 class="font-bold text-4xl mt-5 mb-3">الدعم النفسي</h2>

      <!-- نص و صورة جنب بعض -->
      <div class="flex flex-col md:flex-row justify-between items-start gap-8 mt-6">

        <!-- العمود الأيمن (النص + أزرار) -->
        <div class="flex-1 text-right" >

          <!-- الأزرار -->
          <div class="flex justify-center flex-wrap gap-7 mb-5 ml-40">
            <button class="bg-gradient-to-r from-[#0D8EFF] to-[#00FF84] text-white font-bold text-lg px-10 py-2 rounded-lg mt-3  transition hover:scale-105 shadow mx-auto">

              اطلب مساعدة
            </button>
            <button onclick="window.location.href='Transactions.html'" class="bg-gradient-to-r from-[#0D8EFF] to-[#00FF84] text-white font-bold text-lg px-10 py-2 rounded-lg mt-3  mr-10 hover:scale-105 shadow mx-auto">
              سجل المعاملات
            </button>
          </div>

          <!-- التقييم -->
          <p class="text-lg font-semibold flex items-center gap-2 text-[#6B7280] justify-end mb-4 ml-80">
            <img src="images/star.png" alt="service" class="w-6 h-6">
            5<span id="user-rating">/4.8</span> تقييم المستخدمين
          </p>

          <!-- الفقرات -->
          <p class="text-lg leading-relaxed mb-2">خدمة إنسانية ضمن منصة صديق لمدة ساعة، تهدف إلى مساندة 
ذوي الاحتياجات الخاصة عبر متطوعين مدرَّبين أو مؤهلين لتقديم دعم نفسي 
واجتماعي يساعد المستفيدين على مواجهة ضغوط الحياة والشعور بمزيد من الأمان 
والثقة بالنفس.</p>

          <p class="text-lg leading-relaxed mb-2">تتيح هذه الخدمة للمستفيد طلب متطوع لمدة ساعة ليقوم بـ:</p>

          <p class="text-lg leading-relaxed mb-2">1- التحدث مع متطوع يستمع له بتعاطف واهتمام.</p>
          <p class="text-lg leading-relaxed mb-2">2- الحصول على تشجيع ودعم يعزز الثقة بالنفس والإيجابية.</p>
          <p class="text-lg leading-relaxed">3- التغلب على مشاعر العزلة عبر وجود صديق متفهم.</p>
        </div>

        <!-- العمود الأيسر (الصورة) -->
        <div class="flex-1 flex justify-center">
          <img src="images/img8.jpg" alt="service" class="mr-72 w-[350px] h-[350px] object-cover rounded-lg shadow-lg">
        </div>

      </div>
    </section>
  </div>

  
    </>
  );
}
