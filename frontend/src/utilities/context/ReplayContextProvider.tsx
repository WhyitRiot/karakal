import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import {ReplayContext} from "./ReplayContext.tsx"
import type {GameOverview} from "./types/GameOverview.ts";
import {GameStateContext} from "../websocket/GameStateContext.tsx";
import * as ReplayClient from "../RestAPIClient/ReplayService.ts"
import type {GameReplay} from "./types/GameReplay.ts";

export const ReplayContextProvider = ({children} : {children: React.ReactNode}) => {
    const [games, setGames] = useState<GameOverview[]>([]);
    const [replay, setReplay] = useState<GameReplay | undefined>(undefined);
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

    const deleteGameOverview = async (gameId: string) => {
        await ReplayClient.deleteGame(gameId);
        setGames(prev => prev.filter(item => item.game.gameId != gameId));
    }

    useEffect(()=>{
        console.log("Inside effect")
        if (!playerId) return;
        console.log("Let's get this shit")
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchGameOverviews(playerId);
    },[playerId])

    return (
        <ReplayContext.Provider value={{games, replay, fetchGameOverviews, fetchGameReplay, deleteGameOverview
        }}>
            {children}
        </ReplayContext.Provider>
    );

};
