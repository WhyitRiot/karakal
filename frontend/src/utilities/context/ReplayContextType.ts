import type {GameOverview} from "./types/GameOverview.ts";
import type { GameReplay } from "./types/GameReplay.ts";

export type ReplayContextType = {
    games: GameOverview[]
    replay: GameReplay | undefined
    fetchGameOverviews: (playerId: string) => void;
    fetchGameReplay: (gameId: string) => void;
    setCurrentReplay: (gameId :string) => void;
}