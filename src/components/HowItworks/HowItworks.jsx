import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  UserPlus,
  Settings,
  Video,
  Heart,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "التسجيل",
    description:
      "أنشئ حسابك المجاني مع تفضيلات إمكانية الوصول واحتياجات التواصل.",
    details: [
      "إعداد سريع في دقيقتين",
      "ملف شخصي لإمكانية الوصول",
      "عناصر تحكم الخصوصية",
    ],
  },
  {
    icon: Settings,
    title: "التخصيص",
    description: "اضبط تفضيلاتك للعرض والصوت وطرق التواصل.",
    details: ["إعدادات بصرية", "تفضيلات صوتية", "خيارات الإشعارات"],
  },
  {
    icon: Video,
    title: "التواصل",
    description:
      "ابدأ محادثات الفيديو أو المحادثات النصية أو المساعدة الطارئة فوراً.",
    details: ["اتصال بنقرة واحدة", "أوضاع تواصل متعددة", "متاح ٢٤/٧"],
  },
  {
    icon: Heart,
    title: "الازدهار",
    description: "انضم لمجتمعنا واحصل على الموارد والدعم الذي تحتاجه.",
    details: ["مجموعات مجتمعية", "مكتبة موارد", "دعم مستمر"],
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            البدء <span className="text-secondary">بسيط</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            لقد صممنا منصتنا لتكون بديهية ومتاحة من الخطوة الأولى. إليك مدى
            سهولة بدء رحلتك معنا.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <Card className="p-6 text-center hover:shadow-card transition-all duration-300 hover:-translate-y-1 border-0 bg-card/50 backdrop-blur">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-neon rounded-full flex items-center justify-center mx-auto mb-4 glow-primary">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -left-2 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {step.description}
                  </p>

                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li
                        key={detailIndex}
                        className="flex items-center text-sm text-muted-foreground justify-end"
                      >
                        <span className="ml-2">{detail}</span>
                        <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Arrow between steps */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -left-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-primary scale-x-[-1]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button variant="hero" size="lg" className="group">
            ابدأ الآن
            <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform scale-x-[-1]" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
