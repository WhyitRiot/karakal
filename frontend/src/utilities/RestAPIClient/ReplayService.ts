import type {GameOverview} from "../context/types/GameOverview.ts";
import type {GameReplay} from "../context/types/GameReplay.ts";

const baseURL = "http://localhost:8080/"

export const getGameOverviews = async (playerId : string): Promise<GameOverview[]> => {
    return await fetch(`${baseURL}replay/${playerId}`, {
        method: "GET"
    }).then(r => r.json());
}

export const getReplay = async (gameId : string) : Promise<GameReplay> => {
    return await fetch(`${baseURL}replay/game/${gameId}`, {
        method : "GET"
    }).then(r => r.json());
}
