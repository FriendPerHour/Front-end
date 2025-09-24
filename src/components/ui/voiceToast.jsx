import useVoice from "../../hooks/use-voice";
import messages from "@/VoiceText/voiceTexts";
import { toast } from "@/components/ui/use-toast";

export const voiceToast = (key, type = "default") => {
  const { speak, voiceMode } = useVoice();
  const message = messages[key];

  toast({
    description: message,
    variant: type === "error" ? "destructive" : "default",
  });

  if (voiceMode) speak(message);
};
