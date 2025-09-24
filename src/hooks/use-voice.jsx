import { createContext, useContext, useState, useEffect } from "react";

const VoiceContext = createContext();

export function VoiceProvider({ children }) {
  const [voiceMode, setVoiceMode] = useState(false);
  const [voice, setVoice] = useState(null);

  const speak = (text) => {
    if (!voiceMode) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ar-EG";
    utterance.rate = 1;
    utterance.pitch = 1;
    if (voice) utterance.voice = voice;
    synth.speak(utterance);
  };

  useEffect(() => {
    const synth = window.speechSynthesis;

    const loadVoices = () => {
      const voices = synth.getVoices();
      const arabicVoice = voices.find((v) => v.lang.includes("ar"));
      if (arabicVoice) setVoice(arabicVoice);
    };

    loadVoices();
    synth.onvoiceschanged = loadVoices;
  }, []);

  return (
    <VoiceContext.Provider value={{ voiceMode, setVoiceMode, speak }}>
      {children}
    </VoiceContext.Provider>
  );
}

const useVoice = () => useContext(VoiceContext);

export default useVoice;
