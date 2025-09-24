const commands = [
  {
    type: "navigation",
    keywords: ["تسجيل", "تسجيل دخول", "login", "signin", "دخول"],
    requiresNavigation: true,
    action: (navigate) => {
      return {
        message: "جارِ فتح صفحة تسجيل الدخول",
        callback: () => {
          if (navigate && typeof navigate === "function") {
            navigate("/login");
          } else {
            console.error("Navigate function غير متوفر");
          }
        },
      };
    },
  },
  {
    type: "navigation",
    keywords: ["اشتراك", "تسجيل جديد", "register", "signup", "مستخدم جديد"],
    action: (navigate) => {
      return {
        type: "navigation",
        message: "جارِ فتح صفحة التسجيل",
        callback: () => navigate("/register"),
      };
    },
  },
  {
    type: "navigation",
    keywords: ["الرئيسية", "الصفحة الرئيسية", "home", "main", "رئيسية"],
    action: (navigate) => {
      return {
        type: "navigation",
        message: "جارِ الانتقال إلى الصفحة الرئيسية",
        callback: () => navigate("/"),
      };
    },
  },
  {
    type: "navigation",
    keywords: ["الملف الشخصي", "بروفايل", "profile", "حسابي"],
    action: (navigate) => {
      return {
        type: "navigation",
        message: "جارِ فتح الملف الشخصي",
        callback: () => navigate("/profile"),
      };
    },
  },
  {
    type: "navigation",
    keywords: ["الإعدادات", "settings", "اعدادات", "خيارات"],
    action: (navigate) => {
      return {
        type: "navigation",
        message: "جارِ فتح الإعدادات",
        callback: () => navigate("/settings"),
      };
    },
  },
  {
    type: "system",
    keywords: ["توقف", "اوقف", "انهاء", "اقفل", "stop", "إيقاف"],
    action: () => {
      return { type: "stop_assistant", message: "تم إيقاف المساعد" };
    },
  },
  {
    type: "system",
    keywords: ["مساعدة", "help", "ماذا يمكنك أن تفعل"],
    action: () => {
      const helpMessage =
        "يمكنني مساعدتك في التنقل بين الصفحات أو الإجابة على أسئلتك. قل 'اذهب إلى' متبوعاً بالصفحة المطلوبة";
      return { type: "speak", message: helpMessage };
    },
  },
  {
    type: "system",
    keywords: ["تحديث الصفحة", "refresh", "reload"],
    action: () => {
      return {
        type: "navigation",
        message: "جارِ تحديث الصفحة",
        callback: () => window.location.reload(),
      };
    },
  },
  {
    type: "system",
    keywords: ["شكرا", "متشكر", "thanks", "thank you"],
    action: () => ({
      type: "speak",
      message: "العفو، أنا دائماً هنا لمساعدتك",
    }),
  },
  {
    keywords: ["ايميل", "email"],
    requiresNavigation: false,
    action: () => {
      return {
        message: "انا جاهز اكتب الايميل",
        callback: () => {
          const emailInput = document.getElementById("email");
          if (emailInput) {
            emailInput.focus();
          }
        },
      };
    },
  },
  {
    keywords: ["باسورد", "password"],
    requiresNavigation: false,
    action: () => {
      return {
        message: "انا جاهز اكتب الباسورد",
        callback: () => {
          const passwordInput = document.getElementById("password");
          if (passwordInput) {
            passwordInput.focus();
          }
        },
      };
    },
  },
  {
    keywords: ["تم", "اضغط", "لوجين", "login", "دخول"],
    requiresNavigation: false,
    action: () => {
      return {
        message: "جاري تسجيل الدخول...",
        callback: () => {
          const loginButton = document.getElementById("loginForm");
          if (loginButton) {
            loginButton.click();
          } else {
            const form = document.querySelector("form");
            if (form) {
              if (typeof form.requestSubmit === "function") {
                form.requestSubmit();
              } else {
                form.submit();
              }
            }
          }
        },
      };
    },
  },

  {
    type: "system",
    keywords: ["مساعده", "help", "كتالوج", "الأوامر"],
    action: () => {
      const helpMessage = `
              الأوامر المتاحة:
              - للتسجيل: قل "تسجيل" أو "Login"
              - للاشتراك: قل "اشتراك" أو "Register"
              - للعودة للرئيسية: قل "الرئيسية" أو "Home"
              - للملف الشخصي: قل "بروفايل" أو "Profile"
              - للإعدادات: قل "إعدادات" أو "Settings"
              - لتحديث الصفحة: قل "تحديث الصفحة"
              - لإيقاف المساعد: قل "توقف"
              - لإدخال الإيميل: قل "ايميل"
              - لإدخال كلمة المرور: قل "باسورد"
              - لتسجيل الدخول: قل "تم" أو "Login"
      `;
      return { message: helpMessage };
    },
  },
];

export default commands;
