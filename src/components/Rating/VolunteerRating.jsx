import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";
import Rating from "./Rating";
import api from "@/api/axios";

const VolunteerRating = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const requestId = searchParams.get("requestId");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      toast({
        title: "الرجاء اختيار تقييم",
        description: "اختر من 1 إلى 5 نجوم للمتابعة.",
        variant: "destructive",
      });
      return;
    }

    const res = await api.post(
      "/requests/rate-service",
      { rating, comment, requestId },
      { withCredentials: true }
    );
    console.log(res);
    if (res.data.statusCode === 200) {
      setSubmitted(true);
      toast({
        title: "شكراً لك على تقييمك!",
        description: "ملاحظاتك تساعدنا على تحسين خدمتنا.",
      });
    } else {
      toast({
        title: "حدث خطأ",
        description: "تعذر إرسال تقييمك. حاول مرة أخرى لاحقاً.",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setRating(0);
    setComment("");
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 sm:p-12 text-center shadow-[var(--shadow-card)] border-border/50">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-primary/10 p-4">
              <CheckCircle2 className="w-16 h-16 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            شكراً لك!
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            تم إرسال تقييمك بنجاح. نحن نقدر وقتك في مشاركة تجربتك معنا.
          </p>
          <div className="mb-8">
            <p className="text-sm text-muted-foreground mb-4">تقييمك:</p>
            <Rating rating={rating} onRatingChange={() => {}} readonly />
          </div>
          <Button onClick={resetForm} size="lg" className="font-semibold">
            إرسال تقييم آخر
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 sm:p-12 shadow-[var(--shadow-card)] border-border/50">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
            قيّم الخدمة
          </h1>
          <p className="text-lg text-muted-foreground">
            نود أن نسمع عن تجربتك معنا
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-center text-sm font-medium text-foreground mb-4">
              كيف تقيّم الخدمة المقدمة لك؟
            </label>
            <Rating rating={rating} onRatingChange={setRating} />
            {rating > 0 && (
              <p className="text-center mt-4 text-sm text-muted-foreground animate-in fade-in duration-300">
                {rating === 1 &&
                  "نأسف لسماع ذلك. الرجاء إخبارنا كيف يمكننا التحسين."}
                {rating === 2 && "نقدر ملاحظاتك. سنعمل على تحسين خدماتنا."}
                {rating === 3 && "شكراً لك! سنستمر في تحسين خدمتنا."}
                {rating === 4 && "رائع! يسعدنا أنك حصلت على تجربة جيدة."}
                {rating === 5 && "ممتاز! شكراً لك على تقييمك الرائع!"}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-foreground mb-2"
            >
              شارك ملاحظاتك (اختياري)
            </label>
            <Textarea
              id="comment"
              placeholder="أخبرنا المزيد عن تجربتك..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[120px] resize-none"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full font-semibold text-lg"
            disabled={rating === 0}
          >
            إرسال التقييم
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default VolunteerRating;
