import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const Unauthorized = () => {
  useEffect(() => {
    console.error("401 Error: User attempted to access unauthorized resource");
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-destructive">401</h1>
          <h2 className="text-2xl font-semibold text-foreground">غير مخول للوصول</h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            عذراً، ليس لديك الصلاحية للوصول إلى هذه الصفحة. يرجى تسجيل الدخول أو التأكد من صلاحياتك.
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <a href="/">العودة للصفحة الرئيسية</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/login">تسجيل الدخول</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
