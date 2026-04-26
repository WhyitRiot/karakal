import {Suit} from "./suit.ts"
import {Rank} from "./rank.ts"

export type Card = {
    id : number
    rank: Rank
    suit?: Suit
}

export const getCardRank = (rank : Rank) : string =>{
    return Object.keys(Rank).find(key => Rank[key as keyof typeof Rank] === rank) || ''
}
