import type {GameOverview} from "../context/types/GameOverview.ts";

const baseURL = "http://localhost:8080/"

export const getReplays = async (playerId : string): Promise<GameOverview[]> => {
    return await fetch(`${baseURL}replay/${playerId}`, {
        method: "GET"
    }).then(r => r.json());
}
