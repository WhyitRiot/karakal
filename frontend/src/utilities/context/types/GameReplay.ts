import type {Game} from "./Game.ts";
import type {User} from "./User.ts"
import type {RoundReplay} from "./RoundReplay.ts";
import type {PlayerScore} from "./PlayerScore.ts";

export type GameReplay= {
    game: Game,
    players: User[],
    results: PlayerScore[],
    roundReplays: RoundReplay[],
}