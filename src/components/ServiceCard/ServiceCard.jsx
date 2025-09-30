import { Button } from "@/components/ui/button";
import ModernCard from "@/components/ModernCard/ModernCard";
import { FloatingElements } from "@/components/FloatingElements/FloatingElements";
import { Sparkles } from "lucide-react";

const ServiceTemplate = ({
  title,
  subtitle,
  description,
  description_extra,
  points,
  heroImage,
  onPrimaryClick,
  onSecondaryClick,
  primaryLabel,
  secondaryLabel,
  PrimaryIcon,
  SecondaryIcon,
}) => {
  return (
    <div className="min-h-screen bg-gradient-subtle relative overflow-hidden">
      <FloatingElements />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>

        <div className="container w-full mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-18 min-h-[80vh]">
            <div className="space-y-8 text-right animate-slide-up">
              <div>
                <div className="inline-flex items-center gap-2 bg-gradient-glass backdrop-blur-xl rounded-full px-6 py-3 mb-6 shadow-glass">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    {subtitle}
                  </span>
                </div>

                <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6 text-teal-600">
                  {title}
                </h1>

                <div className="flex flex-col sm:flex-row gap-4 justify-start mb-6">
                  {onPrimaryClick && (
                    <Button
                      variant="hero"
                      size="xl"
                      onClick={onPrimaryClick}
                      className="group min-w-56 py-4"
                    >
                      {PrimaryIcon && (
                        <PrimaryIcon className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
                      )}
                      {primaryLabel}
                    </Button>
                  )}

                  {onSecondaryClick && (
                    <Button
                      variant="hero"
                      size="xl"
                      onClick={onSecondaryClick}
                      className="min-w-48 py-4 rounded-sm"
                    >
                      {SecondaryIcon && (
                        <SecondaryIcon className="w-5 h-5 ml-2" />
                      )}
                      {secondaryLabel}
                    </Button>
                  )}
                </div>

                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mb-4 font-semibold">
                  {description}
                </p>

                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mb-4 font-semibold">
                  {description_extra}
                </p>

                {points?.map((point, index) => (
                  <p
                    key={index}
                    className="text-xl text-muted-foreground leading-relaxed max-w-2xl mb-2 font-semibold"
                  >
                    {point}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex justify-end lg:justify-end animate-bounce-in">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-hero rounded-[2rem] opacity-20 blur-3xl scale-110 animate-pulse-glow"></div>

                <ModernCard
                  variant="glass"
                  className="relative overflow-hidden rounded-[2rem]"
                >
                  <img
                    src={heroImage}
                    alt={title}
                    className="w-full max-w-md h-auto object-cover transform hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </ModernCard>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceTemplate;
