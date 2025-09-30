import { Button } from "@/components/ui/button";
import { Video, MessageSquare, Phone, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-accessibility.jpg";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-hero py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"></div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-right">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              كسر الحواجز،{" "}
              <span className="bg-gradient-neon bg-clip-text text-transparent">
                بناء الروابط
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              تمكين مجتمعات جميع الاعاقات من خلال حلول الفيديو والتواصل
              المبتكرة. اتصل وتواصل وازدهر مع منصتنا التي تركز على إمكانية
              الوصول.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end mb-8">
              <Button variant="hero" size="lg" className="group">
                <Video className="w-5 h-5 ml-2" />
                ابدأ محادثة فيديو
                <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform scale-x-[-1]" />
              </Button>

              <Button variant="outline" size="lg">
                <MessageSquare className="w-5 h-5 ml-2" />
                دعم نصي
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-end space-x-6 space-x-reverse text-sm text-muted-foreground">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-secondary rounded-full ml-2 animate-pulse"></div>
                متاح ٢٤ في الاسبوع
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-accent rounded-full ml-2 animate-pulse"></div>
                خدمة مجانية
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full ml-2 animate-pulse"></div>
                آمن وخاص
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-hero">
              <img
                src={heroImage}
                alt="People using assistive technology and video chat to communicate"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 bg-card rounded-xl p-4 shadow-card border">
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">دعم مباشر</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-card rounded-xl p-4 shadow-card border">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">مكالمة طوارئ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
