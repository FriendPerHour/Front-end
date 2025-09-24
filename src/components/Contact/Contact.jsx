import React, { useEffect, useState } from "react";
import Style from "./contact.module.css";

export default function Contact() {
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

  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- Tajawal Font -->
  <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Tajawal', sans-serif;
    }
  </style>
</head>

<body class="bg-white min-h-screen flex items-center justify-center">

  <div class="w-full max-w-7xl px-6">

    <!-- Welcome Section -->
    <section class="text-center text-black">
      <h2 class="font-bold text-4xl mt-6 mb-6">تواصل معنا</h2>

      <!-- النص + النموذج -->
      <div class="flex flex-col md:flex-row justify-between gap-10">

        <!-- النصوص (يمين) -->
        <div class="flex-1 text-right space-y-4 mt-20 order-1 md:order-1">
          <p>
            صفحة تواصل معنا هي جسر التواصل المباشر بين المستخدمين وفريق المنصة، من خلالها يمكن للمستخدمين إرسال
            استفساراتهم، مقترحاتهم، أو شكاواهم بسهولة وبخطوات بسيطة، توفر الصفحة أكثر من وسيلة للتواصل سواء عبر نموذج
            المراسلة ، أو البريد الإلكتروني، أو الواتساب.
          </p>
          <p>التواصل عن طريق البريد الألكتروني:- <span class="font-medium">friendperhour@gmail.com</span></p>
          <p>التواصل عن طريق الواتساب:- <span class="font-medium">01559979256</span></p>
        </div>

        <!-- النموذج (يسار) -->
        <div class=" text-right order-2 ">
          <h1 class="text-3xl font-bold mb-0 text-center">إرسال رسالة</h1>

          <div class="bg-white shadow-none rounded-2xl p-6">
            <form id="FormMassege" novalidate class="flex gap-6">

              <!-- الرسالة -->
              <div class="  md:w-1/2 mr-84 ">


                <div>
                  <label for="Name" class="block text-sm text-gray-500 mb-2">الاسم</label>
                  <input type="text" id="Name"
                    class="w-full border-2 border-blue-500 h-10 rounded-lg p-3 focus:outline-none" required>
                </div>

                <div>
                  <label for="email" class="block text-sm text-gray-500 mb-2 mt-6">البريد الإلكتروني</label>
                  <input type="email" id="email"
                    class="w-full border-2 border-blue-500 h-10 rounded-lg p-3 focus:outline-none" required>
                </div>

                <div>
                  <label for="object" class="block text-sm text-gray-500 mb-2 mt-6">موضوع الرسالة</label>
                  <input type="text" id="object"
                    class="w-full border-2 border-blue-500 h-10 rounded-lg p-3 focus:outline-none" required>
                </div>


              </div>

              <!-- موضوع الرسالة (يمين) -->
              <div class="w-full md:w-1/2 mr-10 ml-5">
                <label for="topic" class="block text-sm text-gray-500 mb-2 mr-10">الرسالة</label>
                <textarea id="topic"
                  class=" h-48 mr-10 text-lg border-2 border-blue-500 rounded-lg p-6 focus:outline-none resize-none"
                  required></textarea>
              </div>
          </div>

          <div class=" justify-center mr-44">
            <button type="submit"
              class="bg-gradient-to-r from-[#0D8EFF] to-[#00FF84] text-white font-bold text-lg px-20 py-1 rounded-lg mt-3 transition hover:scale-105 shadow mx-auto">
              إرسال
            </button>
          </div>
          </form>
        </div>
      </div>

  </div>
  </section>
  </div>

</body>

</html>
    </>
  );
}
