import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ImSpinner3 } from "react-icons/im";
import { UserContext, VoiceContext } from "../../Context/AllContext";
import FormikInput from "../ui/formik-input";
import api from "../../api/axios";
import { toast } from "../ui/use-toast";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("البريد الإلكتروني مطلوب"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل، وحرف كبير واحد، ورقم واحد، ورمز خاص واحد"
    )
    .min(8)
    .required("الباسورد مطلوب"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null])
    .required("تأكيد كلمة المرور مطلوب"),
  fullName: Yup.string()
    .required("الاسم مطلوب")
    .min(3, "الاسم قصير جدا")
    .max(30, "الاسم طويل جدا")
    .matches(/^[a-zA-Z\s]+$/, "الاسم يجب أن يحتوي على أحرف ومسافات فقط"),
  role: Yup.string().oneOf(["Volunteer", "Disabled"]).required("الدور مطلوب"),
});

export default function SignUp() {
  let navigate = useNavigate();
  const { setUserLogin } = useContext(UserContext);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { speakResponse } = useContext(VoiceContext);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((errMsg, index) => {
        setTimeout(() => {
          speakResponse(errMsg);
        }, index * 2000);
      });
      setIsLoading(false);
      return;
    }

    formik.handleSubmit();
  };

  async function handleSubmit(formValues) {
    setIsLoading(true);
    try {
      const response = await api.post(`/auth/signup`, formValues);
      setIsLoading(false);

      if (response.data.statusCode === 200) {
        toast({
          title: "✅ تم إنشاء الحساب بنجاح",
          description: "تم إنشاء حسابك بنجاح",
          variant: "default",
        });
        localStorage.setItem("token", response.data.token);
        setUserLogin(response.data.user);
        navigate("/login");
      }
    } catch (error) {
      setIsLoading(false);
      const msg =
        error.response?.data?.message ||
        (Array.isArray(error.response?.data?.errors)
          ? error.response.data.errors.join("، ")
          : "حدث خطأ غير متوقع");
      setError(msg);
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      role: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return <>
  <!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>إنشاء حساب</title>

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
<body class="bg-[#f5f5f5] h-[95vh] flex flex-col items-center justify-center">

  <!-- أزرار الصوت -->
  <div class="mb-4">
    <button onclick="readPage()" class="bg-[#D8EFF4] text-gray-600 text-sm px-3 py-1.5 rounded mr-2">🔊 اقرأ</button>
    <button onclick="stopReading()" class="bg-[#D8EFF4] text-gray-600 text-sm px-3 py-1.5 rounded">⏹ إيقاف</button>
  </div>

  <!-- الحاوية الرئيسية -->
  <div class="flex flex-col md:flex-row w-[90%] h-[90%] rounded-lg overflow-hidden shadow-lg bg-white">

    <!-- القسم النصي مع الفورم -->
    <div class="flex flex-col justify-center text-right bg-[#D8EFF4] flex-[0.4] p-8">
      <div class="bg-white rounded-lg shadow-md p-6 w-80 mx-auto">
        <h2 class="text-center text-2xl font-bold text-black mb-6">إنشاء حساب جديد</h2>
        <form id="signupForm" novalidate class="space-y-4">

          <!-- الاسم -->
          <div class="relative">
            <label for="fullName" class="block text-sm text-gray-500 mb-1">الاسم الكامل</label>
            <input type="text" id="fullName" required class="w-full border rounded-lg pl-10 pr-3 py-2 text-gray-700 focus:ring focus:ring-[#0D8EFF]">
            <img src="images/user.png" alt="user icon" class="absolute left-3 top-9 w-5 h-5">
            <div id="fullNameError" class="text-red-500 text-xs mt-1"></div>
          </div>

          <!-- البريد -->
          <div class="relative">
            <label for="email" class="block text-sm text-gray-500 mb-1">البريد الإلكتروني</label>
            <input type="text" id="email" required class="w-full border rounded-lg pl-10 pr-3 py-2 text-gray-700 focus:ring focus:ring-[#0D8EFF]">
            <img src="images/email.png" alt="email icon" class="absolute left-3 top-9 w-5 h-5">
            <div id="emailError" class="text-red-500 text-xs mt-1"></div>
          </div>

          <!-- كلمة المرور -->
          <div class="relative">
            <label for="password" class="block text-sm text-gray-500 mb-1">كلمة المرور</label>
            <input type="password" id="password" required class="w-full border rounded-lg pl-10 pr-3 py-2 text-gray-700 focus:ring focus:ring-[#0D8EFF]">
            <img src="images/hidden.png" id="togglePassword" class="absolute left-3 top-9 w-5 h-5 cursor-pointer">
            <div id="passwordError" class="text-red-500 text-xs mt-1"></div>
          </div>

          <!-- تأكيد كلمة المرور -->
          <div class="relative">
            <label for="confirmPassword" class="block text-sm text-gray-500 mb-1">تأكيد كلمة المرور</label>
            <input type="password" id="confirmPassword" required class="w-full border rounded-lg pl-10 pr-3 py-2 text-gray-700 focus:ring focus:ring-[#0D8EFF]">
            <img src="images/hidden.png" id="togglePassword2" class="absolute left-3 top-9 w-5 h-5 cursor-pointer">
            <div id="confirmPasswordError" class="text-red-500 text-xs mt-1"></div>
          </div>
              <!-- نوع الخدمة -->
        <div class="relative">
          <label for="TypeService" class="block text-sm text-gray-500 mb-1">اختر نوع الخدمة</label>
          <select id="TypeService" required 
          class="w-full border rounded-lg pl-10 pr-3 py-2 text-gray-700 bg-white no-arrow focus:ring focus:ring-[#0D8EFF]">
          <option value="" selected>-- اختر --</option>
          <option value="مستفيد">مستفيد</option>
         <option value="متطوع">متطوع</option>
         </select>
        <img src="images/Vector.png" alt="service icon" class="absolute left-3 top-9 w-3 h-3">
        <div id="disabilityError" class="text-red-500 text-xs mt-1"></div>
      </div>

          <!-- زر -->
          <button type="button" 
            class="w-full bg-gradient-to-r from-[#0D8EFF] to-[#00FF84] text-white font-bold py-2 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(13,142,255,0.6),0_0_30px_rgba(0,255,132,0.6)]">
            إنشاء حساب
          </button>

        </form>
      </div>
    </div>

    <!-- الصورة -->
    <div class="flex-[0.6] bg-cover bg-center hidden md:block" style="background-image: url('images/img10.jpg');"></div>
  </div>

  <script>
    // التنقل بين الصفحات
    document.querySelector("button[type=button]").addEventListener("click", function(){
      window.location.href = "SignIn.html";
    });

    // Toggle Password
    const togglePassword = document.getElementById("togglePassword");
    const password = document.getElementById("password");
    togglePassword.addEventListener("click", () => {
      if(password.type === "password"){
        password.type = "text";
        togglePassword.src = "images/eye.png";
      } else {
        password.type = "password";
        togglePassword.src = "images/hidden.png";
      }
    });

    const togglePassword2 = document.getElementById("togglePassword2");
    const confirmPassword = document.getElementById("confirmPassword");
    togglePassword2.addEventListener("click", () => {
      if(confirmPassword.type === "password"){
        confirmPassword.type = "text";
        togglePassword2.src = "images/eye.png";
      } else {
        confirmPassword.type = "password";
        togglePassword2.src = "images/hidden.png";
      }
    });

    // قراءة النصوص جزء جزء
    function readPage() {
      let parts = [];
      document.querySelectorAll("h1,h2,h3,p,button,a,li,span").forEach(el => {
        let txt = el.innerText.trim();
        if (txt) parts.push(txt);
      });

      let i = 0;
      function speakNext() {
        if (i < parts.length) {
          responsiveVoice.speak(parts[i], "Arabic Female", { onend: speakNext });
          i++;
        }
      }
      speakNext();
    }

    function stopReading() {
      responsiveVoice.cancel();
    }
  </script>
</body>
</html>
  </>;
}
