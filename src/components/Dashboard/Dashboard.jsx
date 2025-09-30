import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/AllContext";
import { useNavigate } from "react-router-dom";
import {
  img4,
  img3,
  img2,
  icon12,
  userAvatar,
  service1,
  service2,
  service3,
  service4,
  service5,
} from "@/assets";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import api from "@/api/axios";

const Home = () => {
  const { userLogin, loading: userLoading } = useContext(UserContext);
  const navigate = useNavigate();
  const [pendingCounts, setPendingCounts] = useState({});
  const [loading, setLoading] = useState(false);

  const hasRole = (roleName) => {
    if (!userLogin || !userLogin.roles) return false;

    const userRoles = userLogin.roles;

    if (Array.isArray(userRoles)) {
      return userRoles.some((role) => {
        const roleObj = role.role || role;
        return roleObj?.name === roleName || roleObj === roleName;
      });
    }

    return false;
  };

  const isVolunteer = hasRole("Volunteer");

  useEffect(() => {
    if (isVolunteer) {
      fetchPendingCounts();
    }
  }, [userLogin, isVolunteer]);

  const fetchPendingCounts = async () => {
    try {
      setLoading(true);
      const response = await api.get("requests/pending-counts", {
        withCredentials: true,
      });

      if (response.data.statusCode === 200) {
        const countsMap = {};
        response.data.data.forEach((service) => {
          countsMap[service.name] = service.pendingCount;
        });
        setPendingCounts(countsMap);
      } else {
        console.warn("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error("Error fetching pending counts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleServiceClick = async (route, service) => {
    if (isVolunteer) {
      const response = await api.get(`requests/getServiceByAlias/${service}`, {
        withCredentials: true,
      });
      if (response.data.statusCode === 200) {
        const serviceId = response.data.data;

        navigate(`/Volunteer${route}?serviceId=${serviceId}`);
      } else {
        console.error("Failed to get service ID");
      }
    } else {
      navigate(`/${route}`);
    }
  };

  const buttons = [
    {
      title: "وصف الأماكن والأشياء",
      icon: service1,
      link: "service1",
      gradient: "bg-gradient-to-r from-teal-300 to-green-300",
      backendName: "وصف الأماكن والأشياء",
      alias: "service1",
    },
    {
      title: "الترجمة الفورية للغة الإشارة",
      icon: service2,
      link: "service2",
      gradient: "bg-gradient-to-r from-teal-300 to-green-300",
      backendName: "الترجمة الفورية للغة الإشارة",
      alias: "service2",
    },
    {
      title: "خدمة المرافقين",
      icon: service3,
      link: "service3",
      gradient: "bg-gradient-to-r from-teal-300 to-green-300",
      backendName: "خدمة المرافقين",
      alias: "service3",
    },
    {
      title: "خدمة التوصيل و تخليص الاوراق",
      icon: service4,
      link: "service4",
      gradient: "bg-gradient-to-r from-teal-300 to-green-300",
      backendName: "خدمة توصيل و تخليص الأوراق",
      alias: "service4",
    },
    {
      title: "الدعم النفسي والاجتماعي",
      icon: service5,
      link: "service5",
      gradient: "bg-gradient-to-r from-teal-300 to-green-300",
      backendName: "الدعم النفسي والاجتماعي",
      alias: "service5",
    },
  ];

  const services = [
    {
      img: img4,
      icon: icon12,
      text: "خلق بيئة آمنة ومنظمة للقاء بين المتطوعين والمستفيدين بما يضمن الاحترام والراحة للطرفين.",
      justify: "start",
    },
    {
      img: img3,
      icon: icon12,
      text: "تعزيز ثقافة التطوع في المجتمع وتحفيز الشباب على المشاركة الإيجابية.",
      justify: "center",
    },
    {
      img: img2,
      icon: icon12,
      text: "تمكين ذوي الاحتياجات الخاصة عبر تعزيز استقلاليتهم وتقليل شعورهم بالعزلة.",
      justify: "end",
    },
  ];

  const getPendingCount = (backendName) => {
    return pendingCounts[backendName] || 0;
  };

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/20 flex-col">
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <Card className="welcome-card text-center">
            <div className="flex items-center justify-center gap-4 mb-2 py-6">
              <img
                src={userAvatar}
                alt="صورة المستخدم"
                className="w-16 h-16 rounded-full object-cover border-4 border-primary/20"
              />
              <div className="text-right">
                <h1 className="text-3xl font-bold text-foreground mb-1">
                  مرحباً {userLogin?.fullName || "المستخدم"}
                </h1>
                <p className="text-muted-foreground">
                  {isVolunteer
                    ? "اختر الخدمة التي تريد التطوع فيها"
                    : "اختر الخدمة التي تحتاجها"}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {buttons.map((btn, index) => {
              const pendingCount = isVolunteer
                ? getPendingCount(btn.backendName)
                : 0;

              return (
                <Card
                  key={index}
                  className="service-card py-4 group cursor-pointer relative"
                  onClick={() => handleServiceClick(btn.link, btn.alias)}
                >
                  <div className="text-center space-y-4">
                    <div
                      className={`w-28 h-28 p-1 my-4 mx-auto rounded-2xl bg-gradient-to-br ${btn.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div className="relative inline-block w-full h-full">
                        {isVolunteer && pendingCount > 0 && (
                          <Badge
                            variant="default"
                            className="absolute -top-2 -left-2 min-w-6 h-6 flex items-center justify-center rounded-full"
                          >
                            {pendingCount}
                          </Badge>
                        )}
                      </div>
                      <img
                        src={btn.icon}
                        alt={btn.title}
                        className="w-full h-full rounded-2xl object-cover"
                      />
                    </div>
                    <h3 className="text-md font-semibold text-foreground leading-relaxed">
                      {btn.title}
                    </h3>

                    {isVolunteer && (
                      <div className="text-xs text-muted-foreground mt-2">
                        {loading ? (
                          <span>جاري التحميل...</span>
                        ) : (
                          <span>{pendingCount} طلبات بانتظار المساعدة</span>
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto my-8 px-4 mt-2 mb-2">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">أهدافنا</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            نسعى لتقديم أفضل الخدمات لذوي الاحتياجات الخاصة من خلال منصة متكاملة
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`flex-1 flex justify-${service.justify} mt-0`}
            >
              <div className="text-center w-[250px] h-[290px]">
                <img
                  src={service.img}
                  className="w-[250px] h-[150px] object-cover mx-auto mb-3 rounded-lg"
                  alt="service"
                />
                <div className="flex justify-center mb-2">
                  <img src={service.icon} className="w-10 h-10" alt="icon" />
                </div>
                <p className="text-sm font-bold text-[#6B7280]">
                  {service.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
