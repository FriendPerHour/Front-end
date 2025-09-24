import { useContext, useEffect, useState } from "react";
import { VoiceContext } from "../../Context/AllContext";

const FormikInput = ({
  label,
  name,
  type = "text",
  placeholder = " ",
  formik,
  required = false,
  pattern,
  className = ""
}) => {
  const { speakResponse, currentLang } = useContext(VoiceContext);
  const [lastSpokenState, setLastSpokenState] = useState(null);

  const hasError = formik.errors[name] && formik.touched[name];
  const isSuccess = formik.touched[name] && !formik.errors[name];

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
    lastSpokenState
  ]);

  return (
    <div className="relative z-0 w-full mb-5 group">
      <input
        type={type}
        name={name}
        id={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder={placeholder || (currentLang === "ar-EG" ? " " : " ")}
        pattern={pattern}
        required={required}
        className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer
          ${
            hasError
              ? "border-red-500 text-red-900 placeholder-red-700 focus:border-red-500 dark:border-red-500 dark:text-red-500 dark:placeholder-red-500"
              : isSuccess
              ? "border-green-500 text-green-900 placeholder-green-700 focus:border-green-500 dark:border-green-500 dark:text-green-400 dark:placeholder-green-500"
              : "border-gray-300 text-gray-900 dark:text-white dark:border-gray-600 focus:border-blue-600 dark:focus:border-blue-500"
          } ${className}`}
      />
      <label
        htmlFor={name}
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
          peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500
          peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {label}
      </label>

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
