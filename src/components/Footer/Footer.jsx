import { Heart, Shield, Accessibility } from "lucide-react";
import { logo } from "@/assets";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-bold">
                <img src={logo} alt="صديق لمدة ساعه" className="h-10 w-auto sm:h-10 md:h-12 lg:h-14 object-contain" />
              </span>
            </div>
            <p className="text-background/80 mb-4 leading-relaxed text-right">
              كسر الحواجز وبناء الروابط لمجتمع المكفوفين والصم. نؤمن أن الجميع
              يستحق تواصلاً متاحاً ومعنوياً.
            </p>

          </div>



          {/* Support */}
          <div className="text-right pl-20">
            <h4 className="font-semibold mb-4">الدعم</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  مركز المساعدة
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  اتصل بنا
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  سياسة الخصوصية
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  شروط الخدمة
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  إمكانية الوصول
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-center items-center">
          <p className="text-sm text-background/60 mb-4 md:mb-0">
            © {currentYear} صديق لمدة ساعة. صُنع{" "}
            <Heart className="w-4 h-4 inline text-red-400" /> من أجل إمكانية
            الوصول.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
