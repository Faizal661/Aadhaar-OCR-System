import { createContext, useContext } from 'react';
import type { AadhaarDetails } from "../types/aadhaarData";

interface AadhaarContextType {
  ocrResult: AadhaarDetails | null;
  setOcrResult: (data: AadhaarDetails | null) => void;
  isProcessing: boolean;
  setIsProcessing: (status: boolean) => void;
}

export const AadhaarContext = createContext<AadhaarContextType | undefined>(undefined);

export const useAadhaar = () => {
  const context = useContext(AadhaarContext);
  if (!context) {
    throw new Error("useAadhaar must be used with in an AadhaarProvider");
  }
  return context;
};

