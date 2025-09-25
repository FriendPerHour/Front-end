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

  return (
    <>
      {" "}
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

        <form className="max-w-xl mx-auto" onSubmit={handleFormSubmit}>
          <FormikInput
            label="Full Name"
            name="fullName"
            type="text"
            formik={formik}
            required
          />

          <FormikInput
            label="Email"
            name="email"
            type="email"
            formik={formik}
            required
          />

          <FormikInput
            label="Password"
            name="password"
            type="password"
            formik={formik}
            required
          />

          <FormikInput
            label="Confirm password"
            name="confirmPassword"
            type="password"
            formik={formik}
            required
          />

          <div className="mb-5">
            <label
              htmlFor="role"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              اختر نوع الخدمه
            </label>
            <select
              id="role"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" label="اختر نوع الخدمه" />
              <option value="Volunteer">متطوع</option>
              <option value="Disabled">ذوي الاحتياجات الخاصة</option>
            </select>
          </div>

          <button
            type="submit"
            className="text-blue-100 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {isLoading ? (
              <ImSpinner3 className="animate-spin h-5 w-5" />
            ) : (
              "إنشاء حساب"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
