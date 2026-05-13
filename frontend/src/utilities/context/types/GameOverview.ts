import type {Game} from "./Game.ts";
import type {PlayerScore} from "./PlayerScore.ts";
import type {GameLeaderboard} from "./GameLeaderboard.ts";

export type GameOverview = {
    game: Game,
    leaderboard: GameLeaderboard[];
}


// UUID getPlayerId();
// String getUsername();
// Long getTotalScore();

// private Game game;
// private List<PlayerScore> leaderboard;