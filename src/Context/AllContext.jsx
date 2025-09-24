import { createContext, useContext } from "react";

export const UserContext = createContext(0);
export const VoiceContext = createContext();

export const useVoice = () => useContext(VoiceContext);