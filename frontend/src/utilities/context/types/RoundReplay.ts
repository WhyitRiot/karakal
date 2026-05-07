import type {Round} from "./Round.ts";
import type {GameEvent} from "./GameEvent.ts";
import type {Card} from "../../types/card.ts";
import type {PlayerScore} from "./PlayerScore.ts";
import type {PlayerHand} from "./PlayerHand.ts";

export type RoundReplay = {
    events: GameEvent[],
    initialDeck : Card[],
    startingHands: PlayerHand[],
    scores: PlayerScore[]
}