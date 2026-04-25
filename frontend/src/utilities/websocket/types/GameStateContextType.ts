import type {GameState} from "./GameState.ts";
import type {PlayerState} from "./PlayerState.ts";
import {Client} from "@stomp/stompjs";

export type GameStateContextType = {
    playerName : string | undefined
    playerId: string | undefined
    gameId : string | undefined,
    gameState : GameState | undefined,
    playerState : PlayerState | undefined,
    client : Client,
    connected : boolean

    setName : (name: string) => void

    createGame : () => void,
    joinGame: (gameId : string, playerName : string) => void
    startGame : (gameId : string) => void
}