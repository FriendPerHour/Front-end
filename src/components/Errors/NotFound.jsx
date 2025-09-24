import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">
            الصفحة غير موجودة
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            عذراً، لا يمكننا العثور على الصفحة التي تبحث عنها. تأكد من صحة
            الرابط أو عد للصفحة الرئيسية.
          </p>
        </div>
        <Button asChild className="mx-auto">
          <a href="/">العودة للصفحة الرئيسية</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
