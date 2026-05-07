import type {Card} from "../../types/card.ts";

export type PlayerHand = {
    [playerId: string]: Card[]
}