import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import {ReplayContext} from "./ReplayContext.tsx"
import type {GameOverview} from "./types/GameOverview.ts";
import {GameStateContext} from "../websocket/GameStateContext.tsx";
import * as ReplayClient from "../RestAPIClient/ReplayService.ts"

export const ReplayContextProvider = ({children} : {children: React.ReactNode}) => {
    const [games, setGames] = useState<GameOverview[]>([]);
    const context = useContext(GameStateContext);
    if (!context) throw Error("outside of provider!");
    const {playerId} = context;

    const getGameReplays = async (playerId : string) => {
        const games = await ReplayClient.getReplays(playerId);
        setGames(games);
        console.log(games)
    }

    useEffect(()=>{
        console.log("Inside effect")
        if (!playerId) return;
        console.log("Let's get this shit")
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getGameReplays(playerId);

    },[playerId])

    return (
        <ReplayContext.Provider value={{games
        }}>
            {children}
        </ReplayContext.Provider>
    );

};
