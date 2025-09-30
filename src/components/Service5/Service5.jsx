import { Phone, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/img5.jpg";
import ServiceTemplate from "../ServiceCard/ServiceCard";
import { useNavigate } from "react-router-dom";

const Service5 = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  return (
    <ServiceTemplate
      title="الدعم النفسي والاجتماعي"
      subtitle="خدمة متطورة للمساعدة"
      description="خدمة إنسانية ضمن منصة صديق لمدة ساعة، تهدف إلى مساندة ذوي الاحتياجات الخاصة عبر متطوعين مدرَّبين أو مؤهلين لتقديم دعم نفسي واجتماعي يساعد المستفيدين على مواجهة ضغوط الحياة والشعور بمزيد من الأمان والثقة بالنفس."
      description_extra="تتيح هذه الخدمة للمستفيد طلب متطوع لمدة ساعة ليقوم بـ:"
      points={[
        "1- التحدث مع متطوع يستمع له بتعاطف واهتمام.",
        "2- الحصول على تشجيع ودعم يعزز الثقة بالنفس والإيجابية.",
        "3- التغلب على مشاعر العزلة عبر وجود صديق متفهم.",
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
        navigate("/create-request?serviceName=service5");
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

export default Service5;
