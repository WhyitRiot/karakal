import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import {ReplayContext} from "./ReplayContext.tsx"
import type {GameOverview} from "./types/GameOverview.ts";
import {GameStateContext} from "../websocket/GameStateContext.tsx";
import * as ReplayClient from "../RestAPIClient/ReplayService.ts"
import type {GameReplay} from "./types/GameReplay.ts";

export const ReplayContextProvider = ({children} : {children: React.ReactNode}) => {
    const [games, setGames] = useState<GameOverview[]>([]);
    const [replay, setReplay] = useState<any>();
    const context = useContext(GameStateContext);
    if (!context) throw Error("outside of provider!");
    const {playerId} = context;

    const fetchGameOverviews = async (playerId : string) => {
        const games = await ReplayClient.getGameOverviews(playerId);
        setGames(games);
        console.log(games)
    }

    const fetchGameReplay = async (gameId: string) => {
        const replay = await ReplayClient.getReplay(gameId);
        setReplay(replay);
        console.log(replay);
    }

    useEffect(() => {
        if (games.length === 0) return;
        fetchGameReplay(games[0].game.gameId);
    }, [games])

    useEffect(()=>{
        console.log("Inside effect")
        if (!playerId) return;
        console.log("Let's get this shit")
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchGameOverviews(playerId);
    },[playerId])

    return (
        <ReplayContext.Provider value={{games
        }}>
            {children}
        </ReplayContext.Provider>
    );

};
