import type {GameState} from "./GameState.ts";
import type {PlayerState} from "./PlayerState.ts";
import {Client} from "@stomp/stompjs";
import type {Card} from "../../card.ts";
import type {Dispatch, SetStateAction} from "react";

export type GameStateContextType = {
    playerName : string | undefined
    playerId: string | undefined
    gameId : string | undefined,
    gameState : GameState | undefined,
    playerState : PlayerState | undefined,
    client : Client,
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

    //selectCardFromDiscard,discardCard,selectCard, stageCard
}