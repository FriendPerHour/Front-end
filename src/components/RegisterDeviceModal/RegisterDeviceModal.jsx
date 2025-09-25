import React, { useState } from "react";
import api from "../../api/axios";

export default function RegisterDeviceModal({
  setShowModal,
  publicKey,
  onConfirm,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(true); // بداية بشاشة التأكيد

  const handleConfirmRegistration = () => {
    setShowConfirmation(false);
    handleRegister();
  };

  const handleRegister = async () => {
    setIsLoading(true);
    setError("");

    try {
      let challengeData = publicKey;

      if (!challengeData) {
        console.log("🔄 Fetching challenge from backend...");
        const response = await api.post(
          "/auth/register-device-test",
          {},
          { withCredentials: true }
        );

        console.log("📥 Full response:", response);
        console.log("📊 Response data:", response.data);
        console.log("🔍 Response status:", response.status);
        console.log("📋 Response headers:", response.headers);

        // تحقق من هيكل البيانات
        if (response.data && response.data.publicKey) {
          challengeData = response.data.publicKey;
          console.log("✅ Found publicKey in response.data.publicKey");
        } else if (
          response.data &&
          response.data.data &&
          response.data.data.publicKey
        ) {
          challengeData = response.data.data.publicKey;
          console.log("✅ Found publicKey in response.data.data.publicKey");
        } else {
          console.log(
            "❌ Unexpected response structure:",
            JSON.stringify(response.data, null, 2)
          );
          throw new Error("Unexpected response structure from server");
        }
      }

      console.log("🔑 Final challengeData:", challengeData);
      console.log("🔑 Challenge value:", challengeData.challenge);
      console.log("🔑 User data:", challengeData.user);

      if (!challengeData.challenge) {
        console.error(
          "❌ Challenge is missing in challengeData:",
          challengeData
        );
        throw new Error("Challenge is missing from server response");
      }

      // باقي الكود...
    } catch (err) {
      console.error("❌ Device registration error:", err);
      setError(err.message || "فشل في تسجيل الجهاز");
      setShowConfirmation(true);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCancel = () => {
    // لو المستخدم ضغط Cancel، خليه يكمل بدون تسجيل الجهاز
    onConfirm(); // اعتبر إن العملية تمت عشان ميفضلش عالق
    setShowModal(false);
  };

  const handleSkip = () => {
    // نفس الـ Cancel بس بمعنى مختلف للمستخدم
    onConfirm();
    setShowModal(false);
  };

  // شاشة التأكيد الأولى
  if (showConfirmation) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 max-w-md mx-4">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            🔐 تسجيل الجهاز
          </h2>

          <div className="mb-6 text-gray-600 dark:text-gray-300">
            <p className="mb-3">هل تريد تسجيل هذا الجهاز لتعزيز الأمان؟</p>
            <div className="text-sm bg-blue-50 dark:bg-blue-900/30 p-3 rounded">
              <p className="font-medium text-blue-800 dark:text-blue-200 mb-1">
                ✅ المزايا:
              </p>
              <ul className="list-disc list-inside text-blue-700 dark:text-blue-300 space-y-1">
                <li>حماية إضافية باستخدام PIN أو البصمة</li>
                <li>منع تسجيل الدخول من أجهزة غير معروفة</li>
                <li>أمان أفضل لحسابك</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={handleSkip}
            >
              تخطي الآن
            </button>

            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
              onClick={handleConfirmRegistration}
            >
              نعم، سجل الجهاز
            </button>
          </div>
        </div>
      </div>
    );
  }

  // شاشة التحميل أثناء التسجيل
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          🔐 جاري تسجيل الجهاز...
        </h2>

        {error && (
          <div className="p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-700 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="mb-6 text-center">
          {isLoading && !error && (
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
              <p className="text-gray-600 dark:text-gray-300">
                يرجى إدخال PIN أو استخدام البصمة عندما يُطلب منك...
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-3 justify-end">
          {error && (
            <>
              <button
                className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                onClick={handleCancel}
              >
                إلغاء
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                onClick={() => {
                  setError("");
                  handleRegister();
                }}
              >
                إعادة المحاولة
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
