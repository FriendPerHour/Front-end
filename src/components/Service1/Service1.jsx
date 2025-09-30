import { Phone, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/img5.jpg";
import ServiceTemplate from "../ServiceCard/ServiceCard";
import { useNavigate } from "react-router-dom";
import { useVoice } from "../../Context/AllContext";
import pageDescriptions from "../../utils/voiceTexts";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Service1 = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { speakResponse } = useVoice();

  const location = useLocation();

  useEffect(() => {
    const description = pageDescriptions[location.pathname];
    if (description) {
      speakResponse(description);
    }
  }, [location.pathname, speakResponse]);

  return (
    <ServiceTemplate
      title="وصف الأماكن والأشياء والأشخاص"
      subtitle="خدمة متطورة للمساعدة"
      description="الخدمة موجهة خصيصًا لدعم ذوي الإعاقات البصرية أو من يواجهون صعوبة في التعرّف على الأماكن والأشياء من حولهم."
      description_extra="تتيح هذه الخدمة للمستفيد طلب متطوع لمدة ساعة ليقوم بـ:
"
      points={[
        "1- وصف الأماكن: مثل الشوارع، المكاتب، القاعات أو أي بيئة جديدة يحتاج الشخص للتعامل معها.",
        "2-شرح التفاصيل: مثل ألوان الملابس، محتويات غرفة، أو ترتيب الأدوات.",
        "3- المساعدة في التوجيه: إرشاد المستفيد إلى الاتجاهات الصحيحة أثناء التنقل. توفير دعم إنساني مباشر يشعر الشخص بالأمان والثقة.",
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
        navigate("/create-request?serviceName=service1");
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

export default Service1;
