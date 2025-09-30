import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import React, { useState, useContext, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ImSpinner3 } from "react-icons/im";
import { UserContext } from "../../Context/AllContext";
import { toast } from "@/components/ui/use-toast";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import LoginImage from "@/assets/img10.jpg";

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
  const { setUserLogin, userLogin, login } = useContext(UserContext);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    if (userLogin) {
      navigate("/dashboard");
    }
  }, [userLogin, navigate]);

  async function handleSubmit(formValues) {
    setIsLoading(true);
    await api
      .post(`auth/login`, formValues, { withCredentials: true })
      .then(function (response) {
        const { data } = response;
        const { user, tokens } = response.data.data;
        if (data.statusCode === 201) {
          setIsLoading(false);

          login(user, tokens.accessToken);

          // setAccessToken(data.accessToken);
          setUserLogin({ ...user });

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
    <div className="flex flex-col md:flex-row min-w-full rounded-lg overflow-hidden shadow-lg bg-white">
      <div className="flex flex-col justify-center text-right bg-[#D8EFF4] flex-[0.4] p-8">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md mx-auto min-h-[480px] flex flex-col justify-center">
          <h2 className="text-center text-3xl font-bold text-black mb-8">
            تسجيل الدخول
          </h2>

          {error && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={formik.handleSubmit}>
            <div className="relative">
              <input
                type="email"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border rounded-lg pl-10 pr-3 py-3 text-gray-700 focus:ring focus:ring-[#0D8EFF]"
                placeholder="البريد الإلكتروني"
                required
                aria-label="email"
              />
              <FiMail className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
              {formik.errors.email && formik.touched.email && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border rounded-lg pl-10 pr-10 py-3 text-gray-700 focus:ring focus:ring-[#0D8EFF]"
                placeholder="كلمة المرور"
                required
                aria-label="password"
              />
              <FiLock className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />

              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-3 p-1 w-8 h-8 flex items-center justify-center cursor-pointer text-gray-500"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>

              {formik.errors.password && formik.touched.password && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.password}
                </div>
              )}
            </div>
            <button
              id="loginForm"
              type="submit"
              className="w-full bg-gradient-to-r from-[#0D8EFF] to-[#00FF84] text-white font-bold py-3 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(13,142,255,0.6),0_0_30px_rgba(0,255,132,0.6)]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <ImSpinner3 className="animate-spin h-5 w-5" />
                </div>
              ) : (
                "تسجيل الدخول"
              )}
            </button>
          </form>
        </div>
      </div>

      <div
        className="flex-[0.6] bg-cover bg-center hidden md:block"
        style={{ backgroundImage: `url(${LoginImage})` }}
      ></div>
    </div>
  );
}
