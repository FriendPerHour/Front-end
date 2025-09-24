import React, { useState, useEffect, useRef, useContext } from "react";
import { Menu, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-accessibility.jpg";
import { UserContext } from "../../Context/AllContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { userLogin, logout, loading } = useContext(UserContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  let navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  if (loading) return <p>Loading...</p>;
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-neon rounded-lg flex items-center justify-center">
            {/* <span className="text-white font-bold text-lg">A</span> */}
          </div>
          <span className="text-xl font-bold">صديق لمدة ساعة</span>
        </div>
        {userLogin != null ? (
          <>
            <div className="relative inline-block" ref={dropdownRef}>
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                onClick={toggleDropdown}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src={heroImage}
                  alt="user photo"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 z-50 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600">
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      Bonnie Green
                    </span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                      name@flowbite.com
                    </span>
                  </div>
                  <ul className="py-2">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Earnings
                      </a>
                    </li>
                    <li>
                      <span
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                        onClick={handleLogout}
                        style={{ cursor: "pointer" }}
                      >
                        Sign out
                      </span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
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
          </>
        )}

        <div className="hidden md:flex items-center space-x-3 space-x-reverse">
          <Button variant="outline" size="sm">
            <Phone className="w-4 h-4 ml-2" />
            اتصل بالدعم
          </Button>
          <Button variant="hero" size="sm" onClick={() => navigate("/login")}>
            <MessageCircle className="w-4 h-4 ml-2" />
            ابدأ المحادثة
          </Button>
        </div>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-5 h-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </div>
    </header>
  );
}

export default Navbar;
