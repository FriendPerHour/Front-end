import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Send
} from "lucide-react";

const contactMethods = [
  {
    icon: Phone,
    title: "دعم الطوارئ",
    description: "مساعدة فورية على مدار الساعة",
    contact: "1-800-ACCESS",
    color: "text-accent"
  },
  {
    icon: MessageCircle,
    title: "محادثة مباشرة",
    description: "دعم الرسائل الفورية",
    contact: "ابدأ المحادثة",
    color: "text-primary"
  },
  {
    icon: Mail,
    title: "دعم البريد الإلكتروني",
    description: "استجابة خلال ساعتين",
    contact: "support@accessconnect.com",
    color: "text-secondary"
  }
];

const ContactUs = () => {
  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            نحن هنا <span className="text-accent">للمساعدة</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            تواصل مع فريق الدعم أو تواصل معنا لأي أسئلة.
            نحن ملتزمون بتوفير تواصل متاح للجميع.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Methods */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6 text-right">طرق التواصل</h3>

            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-card transition-all duration-300 border-0 bg-card/50 backdrop-blur">
                  <div className="flex items-start space-x-4 space-x-reverse text-right">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-${method.color.split('-')[1]}/20 to-${method.color.split('-')[1]}/10 flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${method.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold mb-1">{method.title}</h4>
                      <p className="text-muted-foreground mb-2">{method.description}</p>
                      <p className="font-medium text-foreground">{method.contact}</p>
                    </div>
                  </div>
                </Card>
              );
            })}

            {/* Additional Info */}
            <Card className="p-6 border-0 bg-gradient-hero">
              <div className="flex items-start space-x-4 space-x-reverse text-right">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">ساعات العمل</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>دعم الطوارئ: ٢٤/٧</p>
                    <p>الدعم العام: الاثنين-الجمعة ٨ص-٨م EST</p>
                    <p>محادثة المجتمع: متاح دائماً</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="p-8 border-0 bg-card/50 backdrop-blur">
            <h3 className="text-2xl font-semibold mb-6 text-right">أرسل لنا رسالة</h3>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-right">
                    الاسم الكامل
                  </label>
                  <Input
                    id="name"
                    placeholder="أدخل اسمك"
                    className="focus-ring text-right"
                    dir="rtl"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-right">
                    البريد الإلكتروني
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="أدخل بريدك الإلكتروني"
                    className="focus-ring text-right"
                    dir="rtl"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2 text-right">
                  الموضوع
                </label>
                <Input
                  id="subject"
                  placeholder="كيف يمكننا مساعدتك؟"
                  className="focus-ring text-right"
                  dir="rtl"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-right">
                  الرسالة
                </label>
                <Textarea
                  id="message"
                  placeholder="أخبرنا المزيد عن احتياجاتك أو أسئلتك..."
                  rows={5}
                  className="focus-ring resize-none text-right"
                  dir="rtl"
                />
              </div>

              <Button variant="hero" size="lg" className="w-full group">
                <Send className="w-4 h-4 ml-2" />
                إرسال الرسالة
                <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform scale-x-[-1]" />
              </Button>
            </form>

            <p className="text-sm text-muted-foreground mt-4 text-center">
              سنرد خلال ساعتين خلال ساعات العمل
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;