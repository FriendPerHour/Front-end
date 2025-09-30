import { useState } from "react";
import { VolunteerModernCard } from "../volunteerModernCard/volunteerModernCard";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import api from "@/api/axios";

export const VolunteerCardService = ({
  requests: initialRequests,
  serviceName,
}) => {
  const [requests, setRequests] = useState(initialRequests || []);
  const navigate = useNavigate();

  const handleAcceptRequest = async (id) => {
    const request = requests.find((r) => r.id === id);
    if (request) {
      setRequests((prev) => prev.filter((r) => r.id !== id));
      const res = await api.post(
        "requests/accept-request",
        { requestId: id },
        { withCredentials: true }
      );
      if (res.data.statusCode === 200) {
        toast({
          title: "تم قبول الطلب",
          description: `تم قبول طلب ${request.requesterDisabled.user.userName}`,
        });
        navigate(`/VolunteerWaiting?requestId=${id}`);
      } else {
        toast({
          title: "خطأ",
          description: `حدث خطأ أثناء قبول الطلب ${request.requesterDisabled.user.userName}`,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen w-full relative">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-neon opacity-60 backdrop-blur-lg" />
        <div className="absolute inset-0 backdrop-blur-sm" />

        <div className="relative z-10 container mx-auto px-4 py-8 ">
          <div className="text-center space-y-6 animate-scale-in">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 text-right mr-2">
              <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                {serviceName}
              </span>
            </h1>

            <p className="text-white/90 text-xl max-w-3xl mx-auto leading-relaxed  text-right mr-4">
              انضم إلى مجتمعنا وساعد الأشخاص ذوي الإعاقة في الحصول على الدعم
              الذي يحتاجونه
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {requests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {requests.map((request, index) => (
              <div key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                <VolunteerModernCard
                  request={request}
                  onAcceptRequest={handleAcceptRequest}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 animate-scale-in">
            <div className="max-w-md mx-auto">
              <div className="mb-8">
                <div className="relative w-32 h-32 mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-electric-blue to-neon-pink rounded-full animate-glow-pulse" />
                  <div className="absolute inset-2 glass rounded-full flex items-center justify-center backdrop-blur-xl">
                    <span className="text-4xl">✨</span>
                  </div>
                </div>
              </div>
              <h3 className="arabic-text text-2xl font-bold text-foreground mb-4">
                تم إنجاز جميع المهام!
              </h3>
              <p className="arabic-text text-muted-foreground text-lg leading-relaxed">
                شكراً لمساهمتك الرائعة في مساعدة المجتمع. ستظهر طلبات جديدة
                قريباً.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
