import {Suit} from "./suit.ts"
import {Rank} from "./rank.ts"

export type CardState = "hand" | "selected" | "discard" | "deck" | "staged"

export type Card = {
    id : number
    rank: Rank
    suit?: Suit
    state?: CardState
}

export const getCardRank = (rank : Rank) : string =>{
    return Object.keys(Rank).find(key => Rank[key as keyof typeof Rank] === rank) || ''
}
