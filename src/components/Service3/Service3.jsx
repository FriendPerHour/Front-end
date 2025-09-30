import { Phone, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/img5.jpg";
import { useNavigate } from "react-router-dom";
import ServiceTemplate from "../ServiceCard/ServiceCard";

const Service3 = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  return (
    <ServiceTemplate
      title=" خدمة المرافقين"
      subtitle="خدمة متطورة للمساعدة"
      description="هي خدمة ضمن منصة صديق لمدة ساعة مخصّصة لمساندة ذوي الاحتياجات الخاصة عبر توفير متطوعين يقومون بدور المرافق الشخصي لفترة زمنية محددة بما يسهّل عليهم إنجاز أنشطتهم اليومية والشعور بمزيد من الأمان والاستقلالية."
      description_extra="تتيح هذه الخدمة للمستفيد طلب متطوع لمدة ساعة ليقوم بـ:
"
      points={[
        "1الحصول على مرافق أثناء زيارة المستشفيات أو المراكز الخدمية.مرافقة في التنقل بين الأماكن كالجامعات أو الأسواق.",
        "2- توفير دعم اجتماعي ومعنوي خلال المناسبات أو الفعاليات.",
        "3- المساعدة في الترتيب والتنظيم داخل الحياة اليومية.",
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
        navigate("/create-request?serviceName=service3");
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

export default Service3;
