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

  return <></>;
}
