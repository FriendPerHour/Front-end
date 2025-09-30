import { Phone, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/img5.jpg";
import ServiceTemplate from "../ServiceCard/ServiceCard";
import { useNavigate } from "react-router-dom";

const Service2 = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  return (
    <ServiceTemplate
      title="الترجمة الفورية للغة الأشارة"
      subtitle="خدمة متطورة للمساعدة"
      description="خدمة إنسانية ضمن منصة صديق لمدة ساعة تهدف إلى دعم الأشخاص من ذوي الإعاقة السمعية عبر توفير متطوعين متخصصين أو مدرَّبين على لغة الإشارة، ليقوموا بترجمة فورية تسهّل التواصل في المواقف اليومية أو الرسمية."
      description_extra="تتيح هذه الخدمة للمستفيد طلب متطوع لمدة ساعة ليقوم بـ:
"
      points={[
        "1- الحصول على مترجم لغة إشارة أثناء الزيارات الطبية أو المعاملات الحكومية.",
        "2- تسهيل التواصل في المؤتمرات، الندوات، أو الفعاليات الاجتماعية.",
        "3- تعزيز الشعور بالاندماج المجتمعي والثقة بالنفس.",
      ]}
      heroImage={heroImage}
      primaryLabel="اطلب مساعدة الآن"
      secondaryLabel="سجل الجلسات"
      PrimaryIcon={Phone}
      SecondaryIcon={Clock}
      onPrimaryClick={() => {
        toast({
          title: "طلب المساعدة",
          description: "سيتم توصيلك بمتطوع خلال دقائق قليلة...",
        });
        navigate("/create-request?serviceName=service2");
      }}
      onSecondaryClick={() =>
        toast({
          title: "سجل المعاملات",
          description: "جاري تحميل سجل المعاملات الخاص بك...",
        })
      }
    />
  );
};

export default Service2;
