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
      .then(async function (response) {
        const { data } = response;
        if (data.statusCode === 201) {
          setIsLoading(false);
          setUserLogin({ ...data.data.User });
          localStorage.setItem("hasSession", "true");

          await api.post(`/auth/register-device`, {
            deviceId: navigator.userAgent,
            withCredentials: true,
          });

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

  async function handleDeviceLogin() {
    try {
      const response = await api.post(`/auth/login-device`, {
        deviceId: navigator.userAgent,
      });

      if (response.data.statusCode === 200) {
        setUserLogin(response.data.data.User);
        localStorage.setItem("hasSession", "true");

        toast({
          title: "تم تسجيل الدخول بالجهاز ✅",
          description: "تم التعرف على جهازك بنجاح",
          variant: "default",
        });

        navigate("/");
      }
    } catch (error) {
      toast({
        title: "فشل تسجيل الدخول ⚠️",
        description:
          error.response?.data?.message ||
          "تعذر التحقق من الجهاز، حاول بالباسورد",
        variant: "destructive",
      });
    }
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
      <div className="py-6 max-w-xl mx-auto text-center text-red-600 font-bold">
        {(error && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {error}
          </div>
        )) ||
          null}

        <button
          type="button"
          className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg"
          onClick={handleDeviceLogin}
        >
          Login with Device PIN / Biometrics
        </button>

        <form className="max-w-xl mx-auto" onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.email}
            </div>
          ) : null}

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>

          {formik.errors.password && formik.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.password}
            </div>
          ) : null}

          <button
            type="submit"
            id="loginForm"
            className="text-blue-100 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {isLoading ? (
              <ImSpinner3 className="animate-spin h-5 w-5" />
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
