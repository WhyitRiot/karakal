import type {Card} from "../../types/card.ts";

export type Action = {
    discard: Card[] | null,
    draw: Card | null
}