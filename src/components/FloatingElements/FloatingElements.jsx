export const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-primary rounded-full opacity-10 animate-float [animation-delay:-2s]"></div>
      <div className="absolute bottom-32 left-16 w-48 h-48 bg-gradient-secondary rounded-full opacity-15 animate-float [animation-delay:-4s]"></div>
      <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-accent/20 rounded-full opacity-20 animate-float [animation-delay:-1s]"></div>

      <div
        className="absolute top-1/4 right-1/4 w-24 h-24 bg-gradient-hero rounded-lg rotate-45 opacity-5 animate-float [animation-delay:-3s]"
        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
      ></div>
      <div className="absolute bottom-1/4 right-1/3 w-16 h-16 bg-primary/10 rounded-full animate-pulse-glow [animation-delay:-5s]"></div>
    </div>
  );
};
