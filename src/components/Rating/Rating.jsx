import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const Rating = ({ rating, onRatingChange, readonly = false }) => {
  return (
    <div className="flex gap-2 justify-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => !readonly && onRatingChange(star)}
          className={cn(
            "transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-1",
            !readonly && "cursor-pointer active:scale-95",
            readonly && "cursor-default"
          )}
          aria-label={`تقييم ${star} نجوم`}
        >
          <Star
            className={cn(
              "w-12 h-12 sm:w-16 sm:h-16 transition-all duration-300",
              star <= rating
                ? "fill-[hsl(var(--star))] stroke-[hsl(var(--star-active))] drop-shadow-[var(--shadow-star)]"
                : "fill-none stroke-muted-foreground hover:stroke-[hsl(var(--star-hover))]"
            )}
            strokeWidth={2}
          />
        </button>
      ))}
    </div>
  );
};

export default Rating;