import React, { useEffect } from "react";
import Style from "./Home.module.css";
import HeroSection from "../HeroSection/HeroSection";
import Features from "../Features/Features";
import HowItWorks from "../HowItWorks/HowItWorks";
import ContactUs from "../ContactUs/ContactUs";
import { useVoice } from "../../Context/AllContext";
import pageDescriptions from "../../utils/voiceTexts";
import { useLocation } from "react-router-dom";

export default function Home() {
  const { speakResponse } = useVoice();

  const location = useLocation();

  useEffect(() => {
    const description = pageDescriptions[location.pathname];
    if (description) {
      speakResponse(description);
    }
  }, [location.pathname, speakResponse]);

  return (
    
  <!-- أزرار الصوت -->
  <div class="mb-4 flex gap-2">
    <button onclick="readPage()" class="bg-[#D8EFF4] text-gray-600 px-3 py-1 rounded">🔊 اقرأ</button>
    <button onclick="stopReading()" class="bg-[#D8EFF4] text-gray-600 px-3 py-1 rounded">⏹ إيقاف</button>
  </div>

  <div class="w-[90%] max-w-[1400px] h-[90%] bg-white rounded-lg shadow-lg flex flex-col">

    <!-- Header (Navbar) -->
    <nav class="bg-[#D8EFF4] p-3 flex justify-between items-center rounded-t-lg">
      
      <!-- القائمة -->
      <ul class="flex gap-2">
        <li>
          <a class="bg-white text-[#0D8EFF] font-bold border border-[#0D8EFF] rounded-lg px-4 py-2 w-[170px] text-center block" href="#" onclick="loadPage('Services.html')">
            الصفحة الرئيسية
          </a>
        </li>
        <!-- Dropdown -->
        <li class="relative group">
          <a class="bg-white text-[#0D8EFF] font-bold border border-[#0D8EFF] rounded-lg px-4 py-2 w-[170px] text-center block cursor-pointer">
            الخدمات
          </a>
          <ul id="dropdownMenu" class="absolute hidden group-hover:block bg-[#D8EFF4] mt-2 rounded shadow-lg w-56 text-right z-50">
            <li>
              <a class="flex items-center p-2 text-white font-bold text-sm hover:bg-[#00FF84]" href="#" onclick="loadPage('service1.html')">
                <img src="images/img5.jpg" class="w-6 h-6 rounded-full ml-2"> وصف الأماكن و الأشياء و الأشخاص
              </a>
            </li>
            <li>
              <a class="flex items-center p-2 text-white font-bold text-sm hover:bg-[#00FF84]" href="#" onclick="loadPage('service2.html')">
                <img src="images/img6.jpg" class="w-6 h-6 rounded-full ml-2"> الترجمة الفورية للغة الإشارة
              </a>
            </li>
            <li>
              <a class="flex items-center p-2 text-white font-bold text-sm hover:bg-[#00FF84]" href="#" onclick="loadPage('service3.html')">
                <img src="images/img7.jpg" class="w-6 h-6 rounded-full ml-2"> خدمة المرافقين
              </a>
            </li>
            <li>
              <a class="flex items-center p-2 text-white font-bold text-sm hover:bg-[#00FF84]" href="#" onclick="loadPage('service4.html')">
                <img src="images/img8.jpg" class="w-6 h-6 rounded-full ml-2"> خدمة التوصيل و تخليص الأوراق
              </a>
            </li>
            <li>
              <a class="flex items-center p-2 text-white font-bold text-sm hover:bg-[#00FF84]" href="#" onclick="loadPage('service5.html')">
                <img src="images/img9.jpg" class="w-6 h-6 rounded-full ml-2"> الدعم النفسي
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a class="bg-white text-[#0D8EFF] font-bold border border-[#0D8EFF] rounded-lg px-4 py-2 w-[170px] text-center block" href="#" onclick="loadPage('Profile.html')">
            الملف الشخصي
          </a>
        </li>
        <li>
          <a class="bg-white text-[#0D8EFF] font-bold border border-[#0D8EFF] rounded-lg px-4 py-2 w-[170px] text-center block" href="#" onclick="loadPage('Contact.html')">
            الدردشة و الدعم
          </a>
        </li>
      </ul>

      <!-- اللوجو -->
      <a class="ml-4" href="#">
        <img src="images/logo.png" alt="Logo" class="w-10 h-10">
      </a>
    </nav>

    <!-- Content Area -->
    <div class="flex-grow">
      <iframe id="iframe-content" src="Services.html" class="w-full h-[66vh] border-none"></iframe>
    </div>

    <!-- Footer -->
    <footer class="bg-black text-[#6B7280] text-center text-lg py-3 mt-2">
      <p>© 2025 منصة صديق لمدة ساعة - جميع الحقوق محفوظة</p>
      <div class="flex justify-between mt-2 px-6">
        <div class="flex gap-4">
          <a href="#" class="hover:underline">الأسئلة الشائعة</a>
          <a href="#" class="hover:underline">الشروط والأحكام</a>
        </div>
        <div class="flex gap-4">
          <a href="#" class="hover:underline">سياسة الخصوصية</a>
          <a href="#" onclick="loadPage('Contact.html')" class="hover:underline">تواصل معنا</a>
        </div>
      </div>
    </footer>
  </div>
      
  );
}
