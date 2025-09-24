import React, { useEffect, useState } from "react";
import Style from "./profile.module.css";

export default function Profile() {
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
  <title>Contact</title>

  <!-- مكتبة ResponsiveVoice -->
  <script src="https://code.responsivevoice.org/responsivevoice.js?key=D6Pcv6Dj"></script>

  <!-- Tailwind -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- Tajawal Font -->
  <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet">

  <style>
    body { font-family: 'Tajawal', sans-serif; }
    .no-arrow {
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      background-image: none !important;
    }
  </style>
</head>
<body class="bg-white min-h-screen flex flex-col items-center justify-center">

  <div class="w-[95%] bg-white">

    <!-- Welcome Section -->
    <section class="text-center text-black">
    <h2 class="font-bold text-4xl mt-4 mb-0 -mr-20">الملف الشخصي</h2>

      <!-- Form -->
      <div class="flex justify-between flex-wrap">
        <div>
          <form id="FormMassege" class="bg-white p-2 w-[1230px] mx-auto flex justify-center gap-[120px]" novalidate>
            
            <!-- العمود الأول -->
            <div class="flex flex-col gap-1 w-full md:w-1/3 text-right">
              <label for="name" class="text-sm text-gray-600">الأسم</label>
              <input type="text" id="name" class="mb-5 border-[3px] border-[#0D8EFF] px-3 py-2 text-base text-right rounded" required>

              <label for="email" class="text-sm text-gray-600">البريد الألكتروني</label>
              <input type="email" id="email" class="mb-5 border-[3px] border-[#0D8EFF] px-3 py-2 text-base text-right rounded" required>

              <label for="password" class="text-sm text-gray-600">كلمة المرور</label>
              <input type="password" id="password" class="mb-5 border-[3px] border-[#0D8EFF] px-3 py-2 text-base text-right rounded" required>

              <label for="address" class="text-sm text-gray-600">العنوان</label>
              <input type="text" id="address" class="mb-3 border-[3px] border-[#0D8EFF] px-3 py-2 text-base text-right rounded" required>

              <button type="submit"
                class="bg-gradient-to-r from-[#0D8EFF] to-[#00FF84] text-white font-bold text-lg px-20 py-1 rounded-lg mt-3 transition hover:scale-105 shadow mx-auto">
                حفظ
              </button>
            </div>
                <!-- العمود الثاني -->
            <div class="flex flex-col gap-1 w-full md:w-1/3 text-right">
              <label for="age" class="text-sm text-gray-600">العمر</label>
              <input type="text" id="age" class="mb-5 border-[3px] border-[#0D8EFF] px-3 py-2 text-base text-right rounded" required>

              <label for="type" class="text-sm text-gray-600">النوع</label>
              <div class="relative">
                <select id="type" class="bg-white mb-5 border-[3px] border-[#0D8EFF] px-3 py-2 w-full text-base text-right rounded no-arrow">
                  <option value="" selected>-- اختر --</option>
                  <option value="ذكر">ذكر</option>
                  <option value="أنثي">أنثي</option>
                </select>
                <img src="images/Vector.png" alt="icon" class="absolute left-3 top-1/3 -translate-y-1/2 w-3 h-3">
              </div>

              <label for="phone" class="text-sm text-gray-600">رقم الهاتف</label>
              <input type="text" id="phone" class="mb-5 border-[3px] border-[#0D8EFF] px-3 py-2 text-base text-right rounded" required>

              <label for="dateOfBirth" class="text-sm text-gray-600">تاريخ الميلاد</label>
              <input type="text" id="dateOfBirth"  placeholder="السنة / الشهر / اليوم" class="mb-3 border-[3px] border-[#0D8EFF] px-3 py-2 text-base text-right rounded" required>

              <button type="reset"
                class="bg-gradient-to-r from-[#0D8EFF] to-[#00FF84] text-white font-bold text-lg px-20 py-1 rounded-lg mt-3 transition hover:scale-105 shadow mx-auto">
                إلغاء
              </button>
            </div>

            <!-- العمود الثالث -->
            <div class="flex flex-col gap-1 w-full md:w-1/3 text-right">
              <label for="disability" class="text-sm text-gray-600">نوع الإعاقة</label>
              <div class="relative">
                <select id="disability" class="bg-white border-[3px] border-[#0D8EFF] px-3 py-2 w-full text-base text-right rounded no-arrow">
                  <option value="" selected>-- اختر --</option>
                  <option value="بصرية">إعاقة بصرية</option>
                  <option value="سمعية">إعاقة سمعية</option>
                  <option value="حركية">إعاقة حركية</option>
                  <option value="ذهنية">إعاقة ذهنية</option>
                </select>
                <img src="images/Vector.png" alt="icon" class="mb-5 absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3">
              </div>

              <label for="file-upload"
                class="cursor-pointer bg-gradient-to-r from-[#0D8EFF] to-[#00FF84] text-white font-bold px-10 py-2 rounded-lg flex items-center gap-2 transition hover:scale-105 shadow mt-5 mx-auto">
                <img src="images/upload.png" alt="icon" class="w-5 h-5">
                رفع بطاقة الخدمات المتكاملة
              </label>
              <input type="file" id="file-upload" name="file-upload" class="hidden" accept="image/*">
            </div>

          </form>
        </div>
      </div>
    </section>

  </div>

</body>
</html>
    </>
  );
}
