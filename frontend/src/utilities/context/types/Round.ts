import type {Game} from "./Game.ts";
import type {Card} from "../../types/card.ts";
import type {PlayerHand} from "./PlayerHand.ts";

export type Round = {
    id: number,
    game: Game,
    roundNumber : number,
    initialDeck : Card[],
    startingHands : PlayerHand[];
    initialDiscard : Card;
    status: string
}