import { toast as originalToast } from "../hooks/use-toast";

export const apiToast = (options) => {
  console.log("apiToast called with:", options);

  const result = originalToast(options);

  let messageToSpeak = "";

  if (typeof options === "string") {
    messageToSpeak = options;
  } else if (options.description) {
    if (Array.isArray(options.description)) {
      messageToSpeak = options.description.join(", ");
    } else {
      messageToSpeak = options.description;
    }
  } else if (options.title) {
    messageToSpeak = options.title;
  }

  if (messageToSpeak) {
    const cleanMessage = messageToSpeak.replace(/[⚠️✅❌⏳👋]/g, "").trim();
    console.log("Speaking:", cleanMessage);

    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(cleanMessage);
    utterance.lang = "ar-EG";
    utterance.rate = 1.0;
    speechSynthesis.speak(utterance);
  }

  return result;
};
