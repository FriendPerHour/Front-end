import { Button } from "@/components/ui/button";
import { User, Eye, ClockArrowUp } from "lucide-react";
import { img4 } from "@/assets";
import { timeAgo } from "@/utils/timeAgo";

export const VolunteerModernCard = ({ request, onAcceptRequest }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl p-1 hover-lift animate-slide-up">
      <div className="absolute inset-0 bg-gradient-hero rounded-2xl group-hover:opacity-50 transition-opacity duration-500 animate-glow" />

      <div className="relative bg-gradient-glass rounded-2xl p-6 h-full backdrop-blur-xl border-4 border-emerald-200 border-y-emerald-300">
        <div
          className="absolute top-4 right-4 w-2 h-2 bg-electric-blue rounded-full animate-float"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-neon-pink rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        />

        <div className="relative z-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-300">
              <img
                src={request.avatar || img4}
                alt="Avatar"
                className="w-full h-full rounded-full object-cover  border bg-emerald-200  p-2"
              />
            </div>
          </div>

          <div className="text-center mb-1">
            <p className="text-xl font-bold text-gray-600">
              {request.requesterDisabled.user.userName}
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 mx-4 my-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-emerald-green/20 to-electric-blue/20 border border-emerald-600 ">
              <Eye className="h-4 w-4 text-emerald-600" />
              <span className="arabic-text text-sm text-muted-foreground">
                نوع الإعاقة :-
              </span>
              <div className="flex flex-wrap gap-2">
                {request.requesterDisabled.disabilities.map((d) => (
                  <span
                    key={d.id}
                    className="arabic-text text-sm font-medium text-emerald-600 bg-white px-2 py-1 rounded-full border border-emerald-600"
                  >
                    {d.disability.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-center items-center text-center">
              <ClockArrowUp className=" text-emerald-600" size={16} />

              <p className="text-lg font-light text-gray-600 pb-2 pr-1">
                منذ {timeAgo(request.scheduledStart)}
              </p>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onAcceptRequest(request.id)}
              className="group/btn relative w-full overflow-hidden rounded-xl bg-gradient-neon p-[1px] transition-all duration-300 hover:scale-105"
            >
              <div className="relative flex items-center justify-center px-6 py-4 bg-background/90 rounded-xl backdrop-blur-sm transition-all duration-300 group-hover/btn:bg-background/70">
                <span className="arabic-text text-lg font-bold bg-gradient-neon bg-clip-text text-transparent">
                  قبول الطلب
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/20 to-neon-pink/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-xl" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
