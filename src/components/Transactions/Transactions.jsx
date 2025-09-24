import React, { useEffect, useState } from "react";
import Style from "./transactions.module.css";

export default function Transactions() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    // Side effect logic here
  }, []);

  return (
    <>
      
  <!-- عنوان الصفحة -->
  <h1 class="text-center text-4xl font-bold mt-2">سجل المعاملات</h1>

  <!-- جدول المعاملات -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2 px-4">
    <!-- بطاقة المعاملة -->
    <div class="bg-white p-3 rounded-lg shadow-lg space-y-2 border-4 rounded-full border-[#0D8EFF]">
      <h3 class="text-gray-600">اسم المتطوع: أحمد محمد علي</h3>
      <p class="text-gray-600">المدة: <span class="text-[#03CCAC]">5 ساعات</span></p>
      <p class="text-[#6B7280] relative pl-8 mr-7">
        <!-- الأيقونة خلف النص -->
      <p class="text-[#6B7280] relative pl-8 mr-7">
        <!-- الأيقونة خلف النص -->
        <img src="images/star.png" alt="service"
          class="absolute left-52 top-1/2 transform -translate-y-1/2 w-6 h-6 z-0">
        <span id="user-rating">5</span> /<span>4.8</span> تقييم المستخدمين
      </p>
      <p class="text-gray-600">التاريخ: 2025/09/22</p>
      <button onclick="window.location.href='Waiting.html'"
        class="bg-gradient-to-r from-[#0D8EFF] to-[#00FF84] text-white font-bold text-lg px-10 py-2 rounded-lg mt-3  mr-0 hover:scale-105 shadow mx-auto">
        التواصل مع المتطوع
      </button>
    </div>

    <div class="bg-white p-3 rounded-lg shadow-lg space-y-2 border-4 rounded-full border-[#0D8EFF]">
      <h3 class="text-gray-600">اسم المتطوع: أحمد محمد علي</h3>
      <p class="text-gray-600">المدة: <span class="text-[#03CCAC]">5 ساعات</span></p>
      <p class="text-[#6B7280] relative pl-8 mr-7">
        <!-- الأيقونة خلف النص -->
      <p class="text-[#6B7280] relative pl-8 mr-7">
        <!-- الأيقونة خلف النص -->
        <img src="images/star.png" alt="service"
          class="absolute left-52 top-1/2 transform -translate-y-1/2 w-6 h-6 z-0">
        <span id="user-rating">5</span> /<span>4.8</span> تقييم المستخدمين
      </p>

      <p class="text-gray-600">التاريخ: 2025/09/22</p>
      <button onclick="window.location.href='Waiting.html'"
        class="bg-gradient-to-r from-[#0D8EFF] to-[#00FF84] text-white font-bold text-lg px-10 py-2 rounded-lg mt-3  mr-0 hover:scale-105 shadow mx-auto">
        التواصل مع المتطوع
      </button>
    </div>
        <div class="bg-white p-3 rounded-lg shadow-lg space-y-2 border-4 rounded-full border-[#0D8EFF]">
      <h3 class="text-gray-600">اسم المتطوع: أحمد محمد علي</h3>
      <p class="text-gray-600">المدة: <span class="text-[#03CCAC]">5 ساعات</span></p>
      <p class="text-[#6B7280] relative pl-8 mr-7">
      <p class="text-[#6B7280] relative pl-8 mr-7">
        <img src="images/star.png" alt="service"
          class="absolute left-52 top-1/2 transform -translate-y-1/2 w-6 h-6 z-0">
        <span id="user-rating">5</span> /<span>4.8</span> تقييم المستخدمين
      </p>

      <p class="text-gray-600">التاريخ: 2025/09/22</p>
      <button onclick="window.location.href='Waiting.html'"
        class="bg-gradient-to-r from-[#0D8EFF] to-[#00FF84] text-white font-bold text-lg px-10 py-2 rounded-lg mt-3  mr-0 hover:scale-105 shadow mx-auto">
        التواصل مع المتطوع
      </button>
    </div>
    <div class="bg-white p-3 rounded-lg shadow-lg space-y-2 border-4 rounded-full border-[#0D8EFF]">
      <h3 class="text-gray-600">اسم المتطوع: أحمد محمد علي</h3>
      <p class="text-gray-600">المدة: <span class="text-[#03CCAC]">5 ساعات</span></p>
      <p class="text-[#6B7280] relative pl-8 mr-7">
        <!-- الأيقونة خلف النص -->
      <p class="text-[#6B7280] relative pl-8 mr-7">
        <!-- الأيقونة خلف النص -->
        <img src="images/star.png" alt="service"
          class="absolute left-52 top-1/2 transform -translate-y-1/2 w-6 h-6 z-0">
        <span id="user-rating">5</span> /<span>4.8</span> تقييم المستخدمين
      </p>
      <p class="text-gray-600">التاريخ: 2025/09/22</p>
      <button onclick="window.location.href='Waiting.html'"
        class="bg-gradient-to-r from-[#0D8EFF] to-[#00FF84] text-white font-bold text-lg px-10 py-2 rounded-lg mt-3  mr-0 hover:scale-105 shadow mx-auto">
        التواصل مع المتطوع
      </button>
    </div>
    <div class="bg-white p-3 rounded-lg shadow-lg space-y-2 border-4 rounded-full border-[#0D8EFF]">
      <h3 class="text-gray-600">اسم المتطوع: أحمد محمد علي</h3>
      <p class="text-gray-600">المدة: <span class="text-[#03CCAC]">5 ساعات</span></p>
      <p class="text-[#6B7280] relative pl-8 mr-7">
        <!-- الأيقونة خلف النص -->
      <p class="text-[#6B7280] relative pl-8 mr-7">
        <!-- الأيقونة خلف النص -->
        <img src="images/star.png" alt="service"
          class="absolute left-52 top-1/2 transform -translate-y-1/2 w-6 h-6 z-0">
        <span id="user-rating">5</span> /<span>4.8</span> تقييم المستخدمين
      </p>
      <p class="text-gray-600">التاريخ: 2025/09/22</p>
      <button onclick="window.location.href='Waiting.html'"
        class="bg-gradient-to-r from-[#0D8EFF] to-[#00FF84] text-white font-bold text-lg px-10 py-2 rounded-lg mt-3  mr-0 hover:scale-105 shadow mx-auto">
        التواصل مع المتطوع
      </button>
    </div>

    <div class="bg-white p-3 rounded-lg shadow-lg space-y-2 border-4 rounded-full border-[#0D8EFF]">
      <h3 class="text-gray-600">اسم المتطوع: أحمد محمد علي</h3>
      <p class="text-gray-600">المدة: <span class="text-[#03CCAC]">5 ساعات</span></p>
      <p class="text-[#6B7280] relative pl-8 mr-7">
        <!-- الأيقونة خلف النص -->
      <p class="text-[#6B7280] relative pl-8 mr-7">
        <!-- الأيقونة خلف النص -->
        <img src="images/star.png" alt="service"
          class="absolute left-52 top-1/2 transform -translate-y-1/2 w-6 h-6 z-0">
        <span id="user-rating">5</span> /<span>4.8</span> تقييم المستخدمين
      </p>
      <p class="text-gray-600">التاريخ: 2025/09/22</p>
      <button onclick="window.location.href='Waiting.html'"
        class="bg-gradient-to-r from-[#0D8EFF] to-[#00FF84] text-white font-bold text-lg px-10 py-2 rounded-lg mt-3  mr-0 hover:scale-105 shadow mx-auto">
        التواصل مع المتطوع
      </button>
    </div>

  </div>

    </>
  );
}
