import {createContext} from "react";
import type {GameStateContextType} from "./types/GameStateContextType.ts";

export const GameStateContext = createContext<GameStateContextType | undefined>(undefined);