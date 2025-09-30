import { useNavigate, useSearchParams } from "react-router-dom";
import { useServiceMap } from "@/hooks/use-service-map";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "@/api/axios";
import { toast } from "@/components/ui/use-toast";

const CreateRequestForm = () => {
  const [searchParams] = useSearchParams();
  const serviceName = searchParams.get("serviceName");
  const serviceMap = useServiceMap();
  const navigate = useNavigate();

  const serviceId = serviceMap[serviceName || ""];

  const validationSchema = Yup.object({
    description: Yup.string().required("الوصف مطلوب"),
    scheduledStart: Yup.date().nullable().required("ميعاد المساعدة مطلوب"),
    duration: Yup.string().required("مدة المساعدة مطلوبة"),
  });

  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        serviceId,
        scheduledStart: values.scheduledStart
          ? new Date(values.scheduledStart).toISOString()
          : null,
        scheduledEnd: values.scheduledEnd
          ? new Date(values.scheduledEnd).toISOString()
          : null,
      };

      const res = await api.post("requests/create-request", payload, {
        withCredentials: true,
      });

      if (res.status === 201) {
        toast({
          title: "تم إنشاء الطلب بنجاح ✅",
          description: "سيتم التواصل معك قريبًا 👋",
          variant: "default",
        });
        navigate(`/Waiting?requestId=${res.data.data.id}`);
      }
    } catch (err) {
      console.error(err.response?.data || err.message);

      toast({
        title: "حصل خطأ ❌",
        description: err.response?.data?.message || "حدث خطأ غير متوقع",
        variant: "destructive",
      });
    }
  };

  if (!serviceId)
    return <p className="text-center mt-10">جاري تحميل الخدمة...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Formik
        initialValues={{
          serviceId,
          requestType: "IMMEDIATE",
          serviceMode: "ONLINE",
          communication: "VIDEO_CALL",
          scheduledStart: "",
          scheduledEnd: "",
          tripType: null,
          description: "",
          duration: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white border-2 border-blue-400 p-8 rounded-2xl shadow-md w-[600px]">
            <h1 className="text-2xl font-bold text-center mb-6">إنشاء طلب</h1>

            <Field
              as="textarea"
              name="description"
              placeholder="وصف المساعدة"
              className="w-full border border-blue-400 rounded-md p-3 mb-1"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500 text-sm mb-4"
            />

            <Field
              type="datetime-local"
              name="scheduledStart"
              className="w-full border border-blue-400 rounded-md p-3 mb-1"
            />
            <ErrorMessage
              name="scheduledStart"
              component="div"
              className="text-red-500 text-sm mb-4"
            />

            <Field
              type="text"
              name="duration"
              placeholder="مدة المساعدة (ساعة مثلاً)"
              className="w-full border border-blue-400 rounded-md p-3 mb-1"
            />
            <ErrorMessage
              name="duration"
              component="div"
              className="text-red-500 text-sm mb-4"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white font-bold py-3 rounded-md hover:opacity-90 transition"
            >
              {isSubmitting ? "جاري الإرسال..." : "إنشاء طلب"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateRequestForm;
