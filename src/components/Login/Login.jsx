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

    </>
  );
}
