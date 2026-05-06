import React, {useEffect, useMemo, useRef, useState} from "react";
import {ReplayContext} from "./ReplayContext.tsx"
import type {GameOverview} from "./types/GameOverview.ts";

export const ReplayContextProvider = ({children} : {children: React.ReactNode}) => {
    const [games, setGames] = useState<GameOverview[]>([]);

    useEffect(()=>{

    },[])

    return (
        <ReplayContext.Provider value={{games
        }}>
            {children}
        </ReplayContext.Provider>
    );

};
