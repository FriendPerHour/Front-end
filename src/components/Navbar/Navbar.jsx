import { useState, useEffect, useRef, useContext } from "react";
import { Button } from "@/components/ui/button";
import { UserContext } from "../../Context/AllContext";
import { useNavigate } from "react-router-dom";
import { Menu, MessageCircle, LogIn, X } from "lucide-react";
import { logo } from "@/assets";
import { Link } from "react-router-dom";

function Navbar() {
  const { userLogin, logout, loading } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const services = [
    { text: "وصف الأماكن و الأشياء و الأشخاص", route: "/service1" },
    { text: "الترجمة الفورية للغة الإشارة", route: "/service2" },
    { text: "خدمة المرافقين", route: "/service3" },
    { text: "خدمة التوصيل و تخليص الأوراق", route: "/service4" },
    { text: "الدعم النفسي", route: "/service5" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3 justify-between w-full">
          <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            <div className="flex items-center">
              <img
                src={logo}
                alt="صديق لمدة ساعه"
                className="h-10 w-auto sm:h-10 md:h-12 lg:h-14 object-contain"
              />
            </div>
          </span>

          {userLogin ? (
            <>
              <nav className="hidden md:flex gap-4 items-center">
                <button
                  className="bg-gradient-to-r from-teal-50 to-green-50 text-teal-600 font-semibold border border-teal-200 rounded-full px-4 py-2 hover:from-teal-100 hover:to-green-100 hover:border-teal-300 transition-all duration-200 transform hover:scale-105 shadow-sm"
                  onClick={() => navigate("/dashboard")}
                >
                  الصفحة الرئيسية
                </button>

                <div className="relative" ref={dropdownRef}>
                  <button
                    className="bg-gradient-to-r from-teal-50 to-green-50 text-teal-600 font-semibold border border-teal-200 rounded-full px-4 py-2 hover:from-teal-100 hover:to-green-100 hover:border-teal-300 transition-all duration-200 transform hover:scale-105 shadow-sm flex items-center gap-2"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    الخدمات
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-3 w-72 md:w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden animate-in slide-in-from-top-2 duration-200 z-50">
                      <div className="p-2">
                        {services.map((service, index) => (
                          <button
                            key={index}
                            className="w-full flex items-center p-4 text-gray-700 font-medium text-sm hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 rounded-xl transition-all duration-200 group"
                            onClick={() => {
                              navigate(service.route);
                              setDropdownOpen(false);
                            }}
                          >
                            <div
                              className={`w-10 h-10 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center ml-3 group-hover:scale-110 transition-transform duration-200`}
                            >
                              <img
                                src={service.img || "/placeholder.svg"}
                                className="w-6 h-6 rounded-lg object-cover"
                                alt={service.text}
                              />
                            </div>
                            <span className="text-right flex-1">
                              {service.text}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <button
                  className="bg-gradient-to-r from-teal-50 to-green-50 text-teal-600 font-semibold border border-teal-200 rounded-full px-4 py-2 hover:from-teal-100 hover:to-green-100 hover:border-teal-300 transition-all duration-200 transform hover:scale-105 shadow-sm"
                  onClick={() => navigate("/profile")}
                >
                  الملف الشخصي
                </button>

                <button
                  className="bg-gradient-to-r from-teal-50 to-green-50 text-teal-600 font-semibold border border-teal-200 rounded-full px-4 py-2 hover:from-teal-100 hover:to-green-100 hover:border-teal-300 transition-all duration-200 transform hover:scale-105 shadow-sm"
                  onClick={() => navigate("/contact")}
                >
                  الدردشة و الدعم
                </button>
              </nav>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-50 to-pink-50 text-red-600 border-red-200 hover:from-red-100 hover:to-pink-100 hover:border-red-300 rounded-full px-4 py-2 font-semibold transition-all duration-200 transform hover:scale-105"
              >
                تسجيل الخروج
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
                <span className="sr-only">Open menu</span>
              </Button>

              {mobileMenuOpen && (
                <div className="absolute top-20 left-0 w-full bg-white/95 backdrop-blur-xl shadow-lg flex flex-col items-center gap-3 py-4 z-40 animate-in slide-in-from-top-2 duration-200">
                  <button
                    onClick={() => navigate("/")}
                    className="text-teal-600 font-semibold"
                  >
                    الصفحة الرئيسية
                  </button>

                  <div className="w-full relative">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="w-full text-teal-600 font-semibold flex justify-between items-center px-4 py-2"
                    >
                      الخدمات
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          dropdownOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {dropdownOpen && (
                      <div className="flex flex-col gap-2 mt-2 w-full px-4">
                        {services.map((service, index) => (
                          <div key={index}>{service.text}</div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => navigate("/contact")}
                    className="text-teal-600 font-semibold"
                  >
                    الإرشادات
                  </button>

                  <button
                    onClick={() => navigate("/profile")}
                    className="text-teal-600 font-semibold"
                  >
                    الملف الشخصي
                  </button>
                  <button
                    onClick={() => navigate("/contact")}
                    className="text-teal-600 font-semibold"
                  >
                    الدردشة و الدعم
                  </button>

                  <button
                    onClick={handleLogout}
                    className="text-red-600 font-semibold"
                  >
                    تسجيل الخروج
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <nav className="hidden md:flex mr-3 items-center space-x-8 space-x-reverse">
                <Link
                  to="/"
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  الصفحة الرئيسيه
                </Link>
                <a
                  href="#features"
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  الميزات
                </a>
                <a
                  href="#how-it-works"
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  كيف يعمل
                </a>
                <a
                  href="#contact"
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  اتصل بنا
                </a>
              </nav>
              <div className="hidden md:flex items-center space-x-3 space-x-reverse">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/signup")}
                >
                  <LogIn className="w-4 h-4 ml-2" /> تسجيل حساب
                </Button>
                <Button
                  variant="hero"
                  size="sm"
                  onClick={() => navigate("/login")}
                >
                  <MessageCircle className="w-4 h-4 ml-2" /> تسجيل الدخول{" "}
                </Button>
              </div>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
