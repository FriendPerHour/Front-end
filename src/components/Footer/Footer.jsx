import { Heart, Shield, Accessibility } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-neon rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold">صديق كل ساعة</span>
            </div>
            <p className="text-background/80 mb-4 leading-relaxed text-right">
              كسر الحواجز وبناء الروابط لمجتمع المكفوفين والصم.
              نؤمن أن الجميع يستحق تواصلاً متاحاً ومعنوياً.
            </p>
            <div className="flex items-center space-x-4 space-x-reverse text-sm text-background/60 justify-end">
              <div className="flex items-center">
                <Shield className="w-4 h-4 ml-1" />
                متوافق مع HIPAA
              </div>
              <div className="flex items-center">
                <Accessibility className="w-4 h-4 ml-1" />
                WCAG 2.1 AA
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="text-right">
            <h4 className="font-semibold mb-4">الخدمات</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li><a href="#" className="hover:text-white transition-colors">محادثة فيديو</a></li>
              <li><a href="#" className="hover:text-white transition-colors">دعم نصي</a></li>
              <li><a href="#" className="hover:text-white transition-colors">مساعدة طوارئ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">المجتمع</a></li>
              <li><a href="#" className="hover:text-white transition-colors">الموارد</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="text-right">
            <h4 className="font-semibold mb-4">الدعم</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li><a href="#" className="hover:text-white transition-colors">مركز المساعدة</a></li>
              <li><a href="#" className="hover:text-white transition-colors">اتصل بنا</a></li>
              <li><a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a></li>
              <li><a href="#" className="hover:text-white transition-colors">شروط الخدمة</a></li>
              <li><a href="#" className="hover:text-white transition-colors">إمكانية الوصول</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-background/60 mb-4 md:mb-0">
            © {currentYear} صديق لمدة ساعة. صُنع{" "}
            <Heart className="w-4 h-4 inline text-red-400" />{" "}
            من أجل إمكانية الوصول.
          </p>

          <div className="text-sm text-background/60">
            <span className="ml-4">طوارئ: 1-800-ACCESS</span>
            <span>متاح ٢٤/٧</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;