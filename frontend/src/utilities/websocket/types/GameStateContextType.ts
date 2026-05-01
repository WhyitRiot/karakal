import type {GameState} from "./GameState.ts";
import type {PlayerState} from "./PlayerState.ts";
import {Client} from "@stomp/stompjs";
import type {Card} from "../../types/card.ts";
import type {Dispatch, SetStateAction} from "react";

export type GameStateContextType = {
    playerName : string | undefined
    playerId: string | undefined
    gameId : string | undefined,
    setGameId : (gameId : string) => void;
    gameState : GameState | undefined,
    playerState : PlayerState | undefined,
    isHost : boolean,
    isGameStarted : boolean,
    isMyTurn : boolean,
    currentPlayerName : string | undefined,
    score: number,
    connected : boolean

    tableCards: Card[]
    setTableCards: Dispatch<SetStateAction<Card[]>>

    setName : (name : string) => void;

    createGame : () => void,
    joinGame: (gameId: string, playerName : string) => void
    startGame : () => void
    drawAction : (type: string, cardId? : number) => void;
    discardAction : (cardIds : number[]) => void;
    playAction : (cardIds : number[], drawType: string, cardId? : number) => void;
    callAction : () => void;
    nextRoundAction : () => void;

    //selectCardFromDiscard,discardCard,selectCard, stageCard
}