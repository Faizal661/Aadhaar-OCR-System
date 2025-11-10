import { useState, type ReactNode } from "react";
import { AadhaarContext } from "./aadhaarContext";
import type { AadhaarDetails } from "../types/aadhaarData";

interface AadhaarProviderProps {
  children: ReactNode;
}

export const AadhaarProvider: React.FC<AadhaarProviderProps> = ({
  children,
}) => {
  const [ocrResult, setOcrResult] = useState<AadhaarDetails | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <AadhaarContext.Provider
      value={{ ocrResult, setOcrResult, isProcessing, setIsProcessing }}
    >
      {children}
    </AadhaarContext.Provider>
  );
};
