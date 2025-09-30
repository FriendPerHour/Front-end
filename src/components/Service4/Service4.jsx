import { Phone, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/img5.jpg";
import ServiceTemplate from "../ServiceCard/ServiceCard";
import { useNavigate } from "react-router-dom";

const Service4 = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  return (
    <ServiceTemplate
      title="خدمة توصيل و تخليص الأوراق"
      subtitle="خدمة متطورة للمساعدة"
      description="خدمة إنسانية ضمن منصة صديق لمدة ساعة، وُجهت خصيصًا لدعم ذوي الاحتياجات الخاصة عبر توفير متطوعين يساعدون في توصيل الأشياء  أو إنهاء الأوراق الرسمية التي قد يصعب عليهم القيام بها بمفردهم."
      description_extra="تتيح هذه الخدمة للمستفيد طلب متطوع لمدة ساعة ليقوم بـ:"
      points={[
        "1- الاعتماد على متطوع في توصيل المستلزمات الشخصية أو المشتريات إلى المنزل.",
        "2- إرسال أو استلام أغراض مهمة بأمان وسرعة.",
        "3- توفير وقت وجهد والشعور بالراحة من خلال وجود شخص موثوق.",
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
        navigate("/create-request?serviceName=service4");
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

export default Service4;
