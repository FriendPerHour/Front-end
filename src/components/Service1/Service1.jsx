import React, { useState } from "react";
import api from "../../api/axios";

export default function RegisterDevicePage() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Base64url helpers
  function base64urlToUint8Array(base64url) {
    const padding = "=".repeat((4 - (base64url.length % 4)) % 4);
    const base64 = (base64url + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = atob(base64);
    return new Uint8Array([...rawData].map((c) => c.charCodeAt(0)));
  }

  function uint8ArrayToBase64url(bytes) {
    let binary = "";
    const chunkSize = 0x8000;
    for (let i = 0; i < bytes.length; i += chunkSize) {
      binary += String.fromCharCode.apply(
        null,
        bytes.subarray(i, i + chunkSize)
      );
    }
    return btoa(binary)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");
  }

  const handleRegisterDevice = async () => {
    setIsLoading(true);
    try {
      console.log("🚀 Starting device registration...");

      // 1- اطلب publicKey options من الباك
      // أو جرب endpoint بسيط أول
      console.log("🧪 Testing basic endpoint first...");
      try {
        const testRes = await api.get("/health", { timeout: 5000 });
        console.log("✅ Server is reachable:", testRes.data);
      } catch (testError) {
        console.log("❌ Server not reachable:", testError.message);
        throw new Error(
          "Cannot connect to server. Check if backend is running."
        );
      }
      console.log("🔗 API base URL:", api.defaults.baseURL);
      console.log(
        "🔗 Full URL will be:",
        `${api.defaults.baseURL || ""}/auth/register-device`
      );

      // تجربة مع timeout قصير عشان نشوف لو في مشكلة
      const res = await api.post(
        "/auth/register-device",
        {},
        {
          withCredentials: true,
          timeout: 10000, // 10 ثواني timeout
        }
      );

      console.log("📥 Register device options:", res.data);
      console.log("📊 Response status:", res.status);

      if (!res.data) {
        throw new Error("No response from server");
      }

      const publicKey = { ...res.data }; // نسخ الـ object عشان منغيرش فيه
      console.log("📤 Original publicKey:", publicKey);

      // تأكد من وجود WebAuthn API
      if (!navigator.credentials) {
        throw new Error("WebAuthn is not supported in this browser");
      }

      // 2- حول challenge و user.id → Uint8Array
      try {
        publicKey.challenge = base64urlToUint8Array(publicKey.challenge);
        publicKey.user.id = base64urlToUint8Array(publicKey.user.id);
        console.log("🔄 Converted challenge and user.id to Uint8Array");
      } catch (conversionError) {
        console.error("💥 Conversion error:", conversionError);
        throw new Error(
          "Failed to convert base64url data: " + conversionError.message
        );
      }

      console.log("🔐 About to call navigator.credentials.create...");

      // 3- افتح نافذة PIN/Biometrics مع timeout أقل
      const credential = await Promise.race([
        navigator.credentials.create({
          publicKey: {
            ...publicKey,
            timeout: 30000, // 30 ثانية بدل 60
          },
        }),
        new Promise((_, reject) =>
          setTimeout(
            () =>
              reject(new Error("Timeout: User didn't complete authentication")),
            35000
          )
        ),
      ]);

      if (!credential) {
        throw new Error(
          "Credential creation failed - user cancelled or no credential returned"
        );
      }

      console.log("✅ Credential created successfully:", credential);

      // 4- جهز البيانات للباك
      try {
        const attestationResponse = {
          id: credential.id,
          rawId: uint8ArrayToBase64url(new Uint8Array(credential.rawId)),
          type: credential.type,
          response: {
            clientDataJSON: uint8ArrayToBase64url(
              new Uint8Array(credential.response.clientDataJSON)
            ),
            attestationObject: uint8ArrayToBase64url(
              new Uint8Array(credential.response.attestationObject)
            ),
          },
        };

        console.log("📦 Prepared attestation response:", attestationResponse);

        // 5- بعتها للباك
        const verifyRes = await api.post(
          "/auth/verify-device",
          attestationResponse,
          { withCredentials: true }
        );

        console.log("📤 Verify response:", verifyRes.data);
        setResult("تم تسجيل الجهاز وحفظه ✅");
      } catch (verificationError) {
        console.error("💥 Verification error:", verificationError);
        throw new Error(
          "Failed to verify with server: " + verificationError.message
        );
      }
    } catch (err) {
      console.error("💥 Full Error Details:", err);
      console.error("💥 Error response:", err.response);
      console.error("💥 Error status:", err.response?.status);
      console.error("💥 Error data:", err.response?.data);

      // رسائل خطأ أكثر وضوحاً
      let errorMessage = "فشل ❌: ";

      // تحقق من أخطاء الـ server أولاً
      if (err.response) {
        const status = err.response.status;
        const serverError =
          err.response.data?.message ||
          err.response.data?.error ||
          "Unknown server error";

        if (status === 500) {
          errorMessage += `خطأ في الخادم (500): ${serverError}`;
        } else if (status === 401) {
          errorMessage += "غير مصرح لك - تحقق من تسجيل الدخول";
        } else if (status === 400) {
          errorMessage += `بيانات غير صحيحة (400): ${serverError}`;
        } else {
          errorMessage += `خطأ من الخادم (${status}): ${serverError}`;
        }
      } else if (err.name === "NotSupportedError") {
        errorMessage += "المتصفح لا يدعم WebAuthn أو الجهاز غير متوافق";
      } else if (err.name === "SecurityError") {
        errorMessage += "مشكلة أمان - تأكد من استخدام HTTPS";
      } else if (err.name === "NotAllowedError") {
        errorMessage += "المستخدم رفض المصادقة أو انتهت المهلة الزمنية";
      } else if (err.name === "AbortError") {
        errorMessage += "تم إلغاء العملية";
      } else if (err.message.includes("Timeout")) {
        errorMessage += "انتهت المهلة الزمنية - حاول مرة أخرى";
      } else if (err.message.includes("Network Error")) {
        errorMessage += "مشكلة في الاتصال بالخادم";
      } else {
        errorMessage += err.message || "خطأ غير معروف";
      }

      setResult(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleRegisterDevice}
        disabled={isLoading}
        className={`px-4 py-2 text-white rounded ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {isLoading ? "جاري التسجيل..." : "سجل الجهاز (PIN/Biometrics)"}
      </button>
      {result && <div className="mt-3 p-2 rounded bg-gray-100">{result}</div>}

      {/* معلومات إضافية للتشخيص */}
      <div className="mt-4 text-sm text-gray-600">
        <p>
          <strong>🔧 تشخيص المشكلة:</strong>
        </p>
        <div className="bg-red-50 border border-red-200 rounded p-3 mt-2">
          <p className="text-red-700">
            ❌ <strong>المشكلة:</strong> الـ API baseURL بيشير لـ frontend port
            (3000) بدلاً من backend port!
          </p>
          <p className="text-red-700 mt-1">
            🔗 Current API URL:{" "}
            <code>http://localhost:3000/auth/register-device</code>
          </p>
          <p className="text-green-700 mt-1">
            ✅ <strong>الحل:</strong> غير الـ API baseURL في ملف axios config لـ
            backend port (عادة 5000 أو 8000)
          </p>
        </div>

        <p className="mt-3">
          <strong>تأكد من:</strong>
        </p>
        <ul className="list-disc list-inside">
          <li>استخدام HTTPS (مش HTTP)</li>
          <li>المتصفح يدعم WebAuthn</li>
          <li>الجهاز به PIN/Fingerprint/Face ID</li>
          <li>
            <strong>🔥 الـ backend شغال على port صحيح</strong>
          </li>
          <li>
            <strong>🔥 تصحيح الـ API baseURL في axios config</strong>
          </li>
        </ul>

        <div className="bg-blue-50 border border-blue-200 rounded p-3 mt-2">
          <p className="text-blue-700 font-semibold">الخطوات المطلوبة:</p>
          <ol className="list-decimal list-inside text-blue-700">
            <li>
              افتح ملف <code>api/axios.js</code> أو{" "}
              <code>src/api/axios.js</code>
            </li>
            <li>
              غير <code>baseURL: 'http://localhost:3000'</code>
            </li>
            <li>
              لـ <code>baseURL: 'http://localhost:5000'</code> (أو أي port تاني
              للـ backend)
            </li>
            <li>تأكد إن الـ backend شغال على نفس الـ port</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
