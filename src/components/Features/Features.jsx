import { Card } from "@/components/ui/card";
import {
  Video,
  MessageSquare,
  Phone,
  Users,
  Shield,
  Accessibility,
  Volume2,
  Eye,
  Heart
} from "lucide-react";

const features = [
  {
    icon: Video,
    title: "محادثة فيديو بلغة الإشارة",
    description: "مكالمات فيديو عالية الجودة مع واجهة محسنة لتواصل لغة الإشارة وقراءة الشفاه.",
    color: "text-primary"
  },
  {
    icon: MessageSquare,
    title: "دعم نصي فوري",
    description: "رسائل فورية مع إمكانيات تحويل النص إلى كلام والكلام إلى نص للتواصل السلس.",
    color: "text-secondary"
  },
  {
    icon: Phone,
    title: "المساعدة الطارئة",
    description: "دعم طوارئ على مدار الساعة مع اتصال فوري بمترجمين ومساعدين مؤهلين.",
    color: "text-accent"
  },
  {
    icon: Users,
    title: "دعم المجتمع",
    description: "تواصل مع الأقران ومجموعات الدعم والمتطوعين في منصة مجتمعنا الشاملة.",
    color: "text-primary"
  },
  {
    icon: Volume2,
    title: "تحسين الصوت",
    description: "معالجة صوتية متقدمة لمستخدمي السماعات وذوي فقدان السمع الجزئي.",
    color: "text-secondary"
  },
  {
    icon: Eye,
    title: "المساعدة البصرية",
    description: "تحسين قارئ الشاشة وأوضاع التباين العالي وخدمات الوصف البصري.",
    color: "text-accent"
  },
  {
    icon: Shield,
    title: "الخصوصية والأمان",
    description: "التشفير من طرف إلى طرف يضمن بقاء محادثاتك خاصة وآمنة.",
    color: "text-primary"
  },
  {
    icon: Accessibility,
    title: "إمكانية الوصول الكاملة",
    description: "تصميم متوافق مع WCAG 2.1 AA مع التنقل بلوحة المفاتيح ودعم التقنيات المساعدة.",
    color: "text-secondary"
  },
  {
    icon: Heart,
    title: "رعاية رحيمة",
    description: "متطوعون ومحترفون مدربون يفهمون الاحتياجات الفريدة لمجتمعنا.",
    color: "text-accent"
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            تمكين <span className="text-primary">التواصل</span> للجميع
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            منصتنا الشاملة توفر الأدوات والدعم اللازم لكسر حواجز
            التواصل وتعزيز الروابط المعنوية.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-card transition-all duration-300 hover:-translate-y-1 border-0 bg-card/50 backdrop-blur text-right"
              >
                <div className="mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-${feature.color.split('-')[1]}/20 to-${feature.color.split('-')[1]}/10 flex items-center justify-center mb-4 mr-auto`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;