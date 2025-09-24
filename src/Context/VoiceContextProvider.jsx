import { useContext, useState, useEffect, useCallback } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import api from "../api/axios";
import { toast } from "../components/ui/use-toast";
import { UserContext, VoiceContext } from "./AllContext";
import commands from "../utils/commands";
import pageDescriptions from "../utils/voiceTexts";


export const VoiceProviderAI = ({ children }) => {
  const { userLogin } = useContext(UserContext);
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  const [wakeWords, setWakeWords] = useState([
    "هاي",
    "هيللو",
    "hello",
    "hey",
    "اهلا",
    "هلا",
    "السلام عليكم",
  ]);
  const [pendingCommand, setPendingCommand] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [silenceTimer, setSilenceTimer] = useState(null);
  const [navigate, setNavigate] = useState(null);
  const [location, setLocation] = useState(null);
  const [currentLang, setCurrentLang] = useState("ar-EG");

  const {
    transcript,
    finalTranscript,
    resetTranscript,
    listening,
    interimTranscript,
  } = useSpeechRecognition();

  const containsWakeWord = useCallback(
    (text) => {
      const normalizedText = text.toLowerCase().trim();
      return wakeWords.some((word) =>
        normalizedText.includes(word.toLowerCase().trim())
      );
    },
    [wakeWords]
  );

  const getDetectedWakeWord = useCallback(
    (text) => {
      const normalizedText = text.toLowerCase().trim();
      return wakeWords.find((word) =>
        normalizedText.includes(word.toLowerCase().trim())
      );
    },
    [wakeWords]
  );

  useEffect(() => {
    const fetchWakeWords = async () => {
      if (!userLogin) return;

      try {
        const response = await api.get("/voice-order/wake-word", {
          withCredentials: true,
        });
        const { data } = response;
        if (data.statusCode === 200) {
          if (Array.isArray(data.data)) {
            setWakeWords(data.data);
          } else {
            setWakeWords([data.data]);
          }
        }
      } catch {
        toast({
          title: "⚠️ خطأ",
          description: "لم يتم تحميل الكلمات السرية من الخادم",
          variant: "destructive",
        });
      }
    };

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      toast({
        title: "⚠️ خطأ",
        description: "متصفحك لا يدعم التعرف على الصوت",
        variant: "destructive",
      });
      return;
    }

    fetchWakeWords();
  }, [userLogin]);

  useEffect(() => {
    if (SpeechRecognition.browserSupportsSpeechRecognition()) {
      SpeechRecognition.startListening({
        continuous: true,
        language: currentLang,
        interimResults: true,
      });
    }
  }, [currentLang]);

  useEffect(() => {
    if (!finalTranscript || !finalTranscript.trim() || isProcessing) return;

    const normalizedText = finalTranscript.toLowerCase().trim();

    setTimeout(() => resetTranscript(), 100);

    if (containsWakeWord(normalizedText) && !voiceEnabled) {
      setVoiceEnabled(true);
      setIsProcessing(true);
      speakResponse(
        currentLang === "ar-EG"
          ? "أهلاً بك، أنا جاهز للمساعدة"
          : "Hello, I am ready to help",
        () => setIsProcessing(false)
      );
      return;
    }

    if (voiceEnabled) {
      const cleanText = normalizedText.trim();
      if (cleanText && !containsWakeWord(cleanText)) {
        setPendingCommand(cleanText);
        setIsProcessing(true);
      }
    }
  }, [
    finalTranscript,
    wakeWords,
    voiceEnabled,
    isProcessing,
    resetTranscript,
    containsWakeWord,
    getDetectedWakeWord,
  ]);

  useEffect(() => {
    if (silenceTimer) clearTimeout(silenceTimer);

    if (!interimTranscript || !interimTranscript.trim() || isProcessing) return;
    if (finalTranscript && finalTranscript.trim()) return;

    const timer = setTimeout(() => {
      if (isProcessing || !interimTranscript.trim()) return;

      const normalizedText = interimTranscript.toLowerCase().trim();

      resetTranscript();

      if (containsWakeWord(normalizedText) && !voiceEnabled) {

        setVoiceEnabled(true);
        setIsProcessing(true);
        speakResponse(
          currentLang === "ar-EG"
            ? "أهلاً بك، أنا جاهز للمساعدة"
            : "Hello, I am ready to help",
          () => setIsProcessing(false)
        );
        return;
      }

      if (voiceEnabled) {
        const cleanText = normalizedText.trim();
        if (cleanText && !containsWakeWord(cleanText)) {
          setPendingCommand(cleanText);
          setIsProcessing(true);
        }
      }
    }, 2000);

    setSilenceTimer(timer);

    return () => clearTimeout(timer);
  }, [
    interimTranscript,
    wakeWords,
    voiceEnabled,
    isProcessing,
    finalTranscript,
    resetTranscript,
    containsWakeWord,
    getDetectedWakeWord,
  ]);

  useEffect(() => {
    if (pendingCommand && voiceEnabled && isProcessing)
      processCommand(pendingCommand, navigate);
  }, [pendingCommand, voiceEnabled, isProcessing, navigate]);

  const speakResponse = useCallback(
    (message, onEndCallback = null) => {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = currentLang;
      utterance.rate = 2;
      utterance.onend = () => {
        if (onEndCallback) onEndCallback();
      };
      speechSynthesis.speak(utterance);
    },
    [currentLang]
  );

  const processCommand = useCallback(
    (command, navigateFunction = null) => {
      if (command.includes("عربي")) {
        setCurrentLang("ar-EG");
        speakResponse("تم التحويل إلى اللغة العربية", () => {
          setIsProcessing(false);
          setPendingCommand("");
        });
        return;
      }

      if (command.includes("انجليزي") || command.includes("إنجليزي")) {
        setCurrentLang("en-US");
        speakResponse("Switched to English language", () => {
          setIsProcessing(false);
          setPendingCommand("");
        });
        return;
      }

      if (command.includes("انهي المساعده") || command.includes("توقف")) {
        speakResponse(
          currentLang === "ar-EG"
            ? "تم إيقاف المساعد بالكامل"
            : "Assistant stopped",
          () => {
            setVoiceEnabled(false);
            setIsProcessing(false);
            setPendingCommand("");
            SpeechRecognition.stopListening();
            setTimeout(() => {
              resetTranscript();
              SpeechRecognition.startListening({
                continuous: true,
                language: currentLang,
                interimResults: true,
              });
            }, 500);
          }
        );
        return;
      }

      if (command.includes("تفاصيل")) {
        const description = pageDescriptions[location?.pathname];
        if (description) {
          speakResponse(description, () => {
            setIsProcessing(false);
            setPendingCommand("");
          });
        } else {
          speakResponse("لا يوجد وصف لهذه الصفحة", () => {
            setIsProcessing(false);
            setPendingCommand("");
          });
        }
        return;
      }

      let commandExecuted = false;

      for (const cmd of commands) {
        if (
          cmd.keywords.some((keyword) =>
            command.includes(keyword.toLowerCase().trim())
          )
        ) {
          commandExecuted = true;

          if (!navigateFunction && cmd.requiresNavigation) {
            speakResponse(
              currentLang === "ar-EG"
                ? "عذراً، لا يمكن تنفيذ هذا الأمر الآن"
                : "Sorry, cannot execute this command now",
              () => {
                setIsProcessing(false);
                setPendingCommand("");
              }
            );
            return;
          }

          const result = cmd.action(navigateFunction);

          if (result?.message) {
            speakResponse(result.message, () => {
              if (result?.callback) {
                try {
                  result.callback();
                } catch (error) {
                  console.error("❌ خطأ في تنفيذ callback:", error);
                }
              }
              setIsProcessing(false);
              setPendingCommand("");
            });
          } else {
            setIsProcessing(false);
            setPendingCommand("");
          }

          return;
        }
      }

      if (!commandExecuted) {
        speakResponse(
          currentLang === "ar-EG"
            ? `أنت قلت: ${command}`
            : `You said: ${command}`,
          () => {
            setIsProcessing(false);
            setPendingCommand("");
          }
        );
      }
    },
    [currentLang, location, resetTranscript, speakResponse]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        SpeechRecognition.browserSupportsSpeechRecognition() &&
        !listening &&
        !isProcessing
      ) {
        SpeechRecognition.startListening({
          continuous: true,
          language: currentLang,
          interimResults: true,
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [listening, isProcessing, currentLang]);

  useEffect(() => {
    if (!location || !location.pathname) return;

    const description = pageDescriptions[location.pathname];
    if (description) {
      const timer = setTimeout(() => {
        speakResponse(description);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [location, speakResponse]);

  return (
    <VoiceContext.Provider
      value={{
        voiceEnabled,
        setVoiceEnabled,
        wakeWords,
        setWakeWords,
        transcript,
        pendingCommand,
        listening,
        resetTranscript,
        isProcessing,
        processCommand,
        setNavigate,
        currentLang,
        location,
        setLocation,
        speakResponse,
        containsWakeWord,
        getDetectedWakeWord,
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
};