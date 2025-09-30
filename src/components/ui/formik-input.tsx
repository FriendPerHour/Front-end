import { useContext, useEffect, useState } from "react";
import { VoiceContext } from "../../Context/AllContext";
import { FiEye, FiEyeOff } from "react-icons/fi";

const FormikInput = ({
  label,
  name,
  type = "text",
  placeholder = " ",
  formik,
  required = false,
  pattern,
  className = "",
  Icon,
  withPasswordToggle = false,
}) => {
  const { speakResponse, currentLang } = useContext(VoiceContext);
  const [lastSpokenState, setLastSpokenState] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const hasError = formik.errors[name] && formik.touched[name];
  const isSuccess = formik.touched[name] && !formik.errors[name];

  const inputType =
    withPasswordToggle && type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  useEffect(() => {
    if (hasError && lastSpokenState !== "error") {
      speakResponse(
        currentLang === "ar-EG"
          ? `خطأ: ${formik.errors[name]}`
          : `Error: ${formik.errors[name]}`
      );
      setLastSpokenState("error");
    } else if (isSuccess && lastSpokenState !== "success") {
      speakResponse(
        currentLang === "ar-EG"
          ? "ممتاز، الادخال صحيح"
          : "Great, input is valid"
      );
      setLastSpokenState("success");
    }
  }, [
    hasError,
    isSuccess,
    formik.errors,
    name,
    speakResponse,
    currentLang,
    lastSpokenState,
  ]);

  return (
    <div className="relative z-0 w-full mb-5 group">
      <label htmlFor={name} className="block text-sm text-gray-500 mb-1">
        {label}
      </label>
      <input
        type={inputType}
        name={name}
        id={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder={placeholder || (currentLang === "ar-EG" ? " " : " ")}
        pattern={pattern}
        required={required}
        className={`w-full border rounded-lg pl-10 pr-10 py-2 text-gray-700 focus:ring focus:ring-[#0D8EFF]
          ${
            hasError
              ? "border-red-500 text-red-900 placeholder-red-700 focus:border-red-500 dark:border-red-500 dark:text-red-500 dark:placeholder-red-500"
              : isSuccess
              ? "border-green-500 text-green-900 placeholder-green-700 focus:border-green-500 dark:border-green-500 dark:text-green-400 dark:placeholder-green-500"
              : "border-gray-300 text-gray-900 dark:text-white dark:border-gray-600 focus:border-blue-600 dark:focus:border-blue-500"
          } ${className}`}
      />

      {Icon && <Icon className="absolute left-3 top-9 w-5 h-5 text-teal-600" />}

      {withPasswordToggle && type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword((s) => !s)}
          className="absolute right-3 top-9 w-5 h-5 text-teal-600"
          aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      )}

      {hasError && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">Oops!</span> {formik.errors[name]}
        </p>
      )}

      {isSuccess && (
        <p className="mt-2 text-sm text-green-600 dark:text-green-500">
          <span className="font-medium">Alright!</span> Looks good!
        </p>
      )}
    </div>
  );
};

export default FormikInput;
