import {
  useToast as useOriginalToast,
  toast as originalToast,
} from "../../hooks/use-toast";
import { useVoice } from "../../Context/AllContext";

export const useVoiceToast = () => {
  const { toast: originalToastFn } = useOriginalToast();
  const { currentLang } = useVoice();

  const speakMessage = (message: string, lang = "ar-EG") => {
    if (!message) return;

    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = lang;
    utterance.rate = 1.5;
    speechSynthesis.speak(utterance);
  };

  const voiceToast = (options) => {
    const result = originalToastFn(options);

    let messageToSpeak = "";

    if (typeof options === "string") {
      messageToSpeak = options;
    } else if (options.description) {
      messageToSpeak = options.description;
    } else if (options.title) {
      messageToSpeak = options.title;
    }

    if (messageToSpeak) {
      const cleanMessage = messageToSpeak.replace(/[⚠️✅❌⏳👋]/g, "").trim();

      speakMessage(cleanMessage, currentLang);
    }

    return result;
  };

  return { toast: voiceToast };
};

export const voiceToast = (options) => {
  const result = originalToast(options);

  let messageToSpeak = "";

  if (typeof options === "string") {
    messageToSpeak = options;
  } else if (options.description) {
    messageToSpeak = options.description;
  } else if (options.title) {
    messageToSpeak = options.title;
  }

  if (messageToSpeak) {
    const cleanMessage = messageToSpeak.replace(/[⚠️✅❌⏳👋]/g, "").trim();

    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(cleanMessage);
    utterance.lang = "ar-EG";
    utterance.rate = 2.0;
    speechSynthesis.speak(utterance);
  }

  return result;
};

export { useOriginalToast as useToast };

export const toast = voiceToast;
