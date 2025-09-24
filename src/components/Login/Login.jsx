import React, { useState, useContext, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ImSpinner3 } from "react-icons/im";
import { UserContext } from "../../Context/AllContext";
import { toast } from "@/components/ui/use-toast";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      "Password must contain at least 8 characters, 1 uppercase letter, 1 number, and 1 special character"
    )
    .min(8)
    .required("Password is required"),
});

export default function Login() {
  const { setUserLogin, userLogin } = useContext(UserContext);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    if (userLogin) {
      navigate("/");
    }
  }, [userLogin, navigate]);

  async function handleSubmit(formValues) {
    setIsLoading(true);
    await api
      .post(`auth/login`, formValues, { withCredentials: true })
      .then(function (response) {
        const { data } = response;
        if (data.statusCode === 201) {
          setIsLoading(false);
          setUserLogin({ ...data.data.User });
          localStorage.setItem("hasSession", "true");
          toast({
            title: "تم تسجيل الدخول ✅",
            description: "أهلاً بك مرة تانية 👋",
            variant: "default",
          });
        }
      })
      .catch(function (error) {
        setIsLoading(false);
        setError(error.response?.data?.message || "حدث خطأ غير متوقع");
        toast({
          title: "خطأ ⚠️",
          description: "في مشكلة في السيرفر، برجاء المحاولة لاحقًا ⏳",
          variant: "destructive",
        });
      });
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    const handleVoiceFocus = (e) => {
      const { field } = e.detail;
      if (field === "email") document.getElementById("email")?.focus();
      if (field === "password") document.getElementById("password")?.focus();
    };

    window.addEventListener("voiceFill", handleVoiceFocus);
    return () => window.removeEventListener("voiceFill", handleVoiceFocus);
  }, []);

  return (
    <>

  <!-- أزرار الصوت -->
  <div class="mb-4">
    <button onclick="readPage()" class="bg-[#D8EFF4] text-gray-600 text-sm px-3 py-1.5 rounded mr-2">🔊 اقرأ</button>
    <button onclick="stopReading()" class="bg-[#D8EFF4] text-gray-600 text-sm px-3 py-1.5 rounded">⏹ إيقاف</button>
  </div>

  <!-- الحاوية الرئيسية -->
  <div class="flex flex-col md:flex-row w-[90%] h-[90%] rounded-lg overflow-hidden shadow-lg bg-white">

    <!-- التسجيل -->
    <div class="flex flex-col justify-center text-right bg-[#D8EFF4] flex-[0.4] p-8">
      <div class="bg-white rounded-lg shadow-md p-6 w-80 mx-auto">
        <h2 class="text-center text-2xl font-bold text-black mb-6">تسجيل الدخول</h2>
        <form id="signupForm" novalidate class="space-y-4">


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
              <!-- زر -->
          <button type="button" 
            class="w-full bg-gradient-to-r from-[#0D8EFF] to-[#00FF84] text-white font-bold py-2 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(13,142,255,0.6),0_0_30px_rgba(0,255,132,0.6)]">
            تسجيل الدخول
          </button>

        </form>
      </div>
    </div>

    <!-- الصورة -->
    <div class="flex-[0.6] bg-cover bg-center hidden md:block" style="background-image: url('images/img10.jpg');"></div>
  </div>

  
    </>
  );
}
