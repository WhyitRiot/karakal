import {createContext} from "react";
import {type ReplayContextType} from "./ReplayContextType.ts"

export const ReplayContext = createContext<ReplayContextType | undefined>(undefined);