import type {Game} from "./Game.ts";
import type {PlayerScore} from "./PlayerScore.ts";

export type GameOverview = {
    game: Game,
    leaderboard: PlayerScore[];
}


// UUID getPlayerId();
// String getUsername();
// Long getTotalScore();

// private Game game;
// private List<PlayerScore> leaderboard;