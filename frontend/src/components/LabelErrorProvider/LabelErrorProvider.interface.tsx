import { ReactNode } from "react";

export interface LabelErrorProviderProps {
  children: ReactNode;
  error?: string | ReactNode;
  label?: string | ReactNode;
  info?: string | ReactNode;
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  labelPlacement?: "top" | "left";
}
