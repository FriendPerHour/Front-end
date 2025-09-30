import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ImSpinner3 } from "react-icons/im";
import { UserContext, VoiceContext } from "../../Context/AllContext";
import FormikInput from "../ui/formik-input";
import api from "../../api/axios";
import { toast } from "../ui/use-toast";
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import { FaRegListAlt } from "react-icons/fa";
import LoginImage from "@/assets/img10.jpg";

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
    .matches(
      /^[a-zA-Z\u0600-\u06FF\s]+$/,
      "الاسم يجب أن يحتوي على أحرف عربية أو إنجليزية ومسافات فقط"
    ),
  role: Yup.string().oneOf(["Volunteer", "Disabled"]).required("الدور مطلوب"),
});

export default function SignUp() {
  let navigate = useNavigate();
  const { setUserLogin } = useContext(UserContext);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { speakResponse } = useContext(VoiceContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  return (
    <div className="flex flex-col md:flex-row w-[90%] h-[90%] rounded-lg overflow-hidden shadow-lg bg-white mx-auto">
      <div className="flex flex-col justify-center text-right bg-[#D8EFF4] flex-[0.4] p-8">
        <div className="bg-white rounded-lg shadow-md p-6 w-80 mx-auto">
          <h2 className="text-center text-2xl font-bold text-black mb-6">
            إنشاء حساب جديد
          </h2>

          <form className="max-w-xl mx-auto" onSubmit={handleFormSubmit}>
            <FormikInput
              label="الاسم الكامل"
              name="fullName"
              type="text"
              formik={formik}
              required
              Icon={FiUser}
              className="w-full border rounded-lg pl-10 pr-3 py-2 text-gray-700 focus:ring focus:ring-[#0D8EFF]"
            />
            <FormikInput
              label="البريد الإلكتروني"
              name="email"
              type="email"
              formik={formik}
              required
              Icon={FiMail}
              className="w-full border rounded-lg pl-10 pr-10 py-2 text-gray-700 focus:ring focus:ring-[#0D8EFF]"
            />

            <FormikInput
              label="كلمة المرور"
              name="password"
              type="password"
              formik={formik}
              required
              Icon={FiLock}
              withPasswordToggle
              className="w-full border rounded-lg pl-10 pr-10 py-2 text-gray-700 focus:ring focus:ring-[#0D8EFF]"
            />

            <FormikInput
              label="تأكيد كلمة المرور"
              name="confirmPassword"
              type="password"
              formik={formik}
              required
              Icon={FiLock}
              className="w-full border rounded-lg pl-10 pr-10 py-2 text-gray-700 focus:ring focus:ring-[#0D8EFF]"
              withPasswordToggle
            />

            <div className="relative">
              <label
                htmlFor="role"
                className="block text-sm text-gray-500 mb-1"
              >
                اختر نوع الخدمه
              </label>
              <select
                id="role"
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border rounded-lg pl-10 pr-3 py-2 text-gray-700 bg-white focus:ring focus:ring-[#0D8EFF]"
              >
                <option value="" label="اختر نوع الخدمه" disabled selected />
                <option value="Volunteer">متطوع</option>
                <option value="Disabled">مستفيد</option>
              </select>
              <FaRegListAlt className="absolute left-3 top-9 w-5 h-5 text-gray-400" />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#0D8EFF] to-[#00FF84] text-white font-bold py-2 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(13,142,255,0.6),0_0_30px_rgba(0,255,132,0.6)] mt-4"
            >
              {isLoading ? (
                <ImSpinner3 className="animate-spin h-5 w-5" />
              ) : (
                "إنشاء حساب"
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
