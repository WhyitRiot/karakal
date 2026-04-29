import type {GameState} from "./GameState.ts";
import type {PlayerState} from "./PlayerState.ts";
import {Client} from "@stomp/stompjs";
import type {Card} from "../../card.ts";

export type GameStateContextType = {
    playerName : string | undefined
    playerId: string | undefined
    gameId : string | undefined,
    gameState : GameState | undefined,
    playerState : PlayerState | undefined,
    client : Client,
    connected : boolean
    discard: () => void;

    discardHand : Card[]
    tableCards: Card[]
    pickedUpCard : boolean
    pickUpCard: () => void;

    addCard : (card : Card) => void
    removeCard : (card: Card) => void
    setName : (name: string) => void
    resetDiscardHand : () => void;

    createGame : () => void,
    joinGame: (gameId : string, playerName : string) => void
    startGame : (gameId : string) => void
}