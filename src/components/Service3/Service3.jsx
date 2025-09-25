import React, { useEffect, useState } from "react";
import Style from "./service3.module.css";

export default function Service3() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    // Side effect logic here
  }, []);

  return (
    <>
      
  <div class="w-full px-6">

    <!-- Welcome Section -->
    <section class="text-center text-black">
      <h2 class="font-bold text-4xl mt-5 mb-3">خدمة المرافقين</h2>

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
          <p class="text-lg leading-relaxed mb-2"> هي خدمة ضمن منصة صديق لمدة ساعة مخصّصة لمساندة ذوي الاحتياجات الخاصة
 عبر توفير متطوعين يقومون بدور المرافق الشخصي لفترة زمنية محددة
 بما يسهّل عليهم إنجاز أنشطتهم اليومية والشعور بمزيد من الأمان والاستقلالية.</p>

          <p class="text-lg leading-relaxed mb-2">تتيح هذه الخدمة للمستفيد طلب متطوع لمدة ساعة ليقوم بـ:</p>

          <p class="text-lg leading-relaxed mb-2">1- الحصول على مرافق أثناء زيارة المستشفيات أو المراكز الخدمية.مرافقة في التنقل بين الأماكن كالجامعات أو الأسواق.</p>
          <p class="text-lg leading-relaxed mb-2">2- توفير دعم اجتماعي ومعنوي خلال المناسبات أو الفعاليات.</p>
          <p class="text-lg leading-relaxed">3- المساعدة في الترتيب والتنظيم داخل الحياة اليومية.</p>
        </div>

        <!-- العمود الأيسر (الصورة) -->
        <div class="flex-1 flex justify-center">
          <img src="images/img7.jpg" alt="service" class="mr-72 w-[350px] h-[350px] object-cover rounded-lg shadow-lg">
        </div>

      </div>
    </section>
  </div>


    </>
  );
}
