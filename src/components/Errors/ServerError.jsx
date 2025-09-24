import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const ServerError = () => {
  useEffect(() => {
    console.error("500 Error: Internal server error occurred");
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-destructive">500</h1>
          <h2 className="text-2xl font-semibold text-foreground">
            خطأ في الخادم
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            عذراً، حدث خطأ في الخادم. نحن نعمل على حل المشكلة. يرجى المحاولة مرة
            أخرى لاحقاً.
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <a href="/">العودة للصفحة الرئيسية</a>
          </Button>
          <Button variant="outline" onClick={() => window.location.reload()}>
            إعادة تحميل الصفحة
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServerError;
