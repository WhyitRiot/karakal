import {Suit} from "./suit.ts"
import {Rank} from "./rank.ts"
import {useState} from "react";
import type {GameState} from "../websocket/types/GameState.ts";

export type CardState = "hand" | "selected" | "discard" | "deck" | "staged" | "drawing" | "discarding"

export type Card = {
    id : number
    rank: Rank
    suit?: Suit
    state?: CardState
}

export const getCardRank = (rank : Rank) : string =>{
    return Object.keys(Rank).find(key => Rank[key as keyof typeof Rank] === rank) || ''
}

export const rankMap: Record<string, Rank> = {
    Joker: Rank.Joker,
    Ace: Rank.Ace,
    Two: Rank.Two,
    Three: Rank.Three,
    Four: Rank.Four,
    Five: Rank.Five,
    Six: Rank.Six,
    Seven: Rank.Seven,
    Eight: Rank.Eight,
    Nine: Rank.Nine,
    Ten: Rank.Ten,
    Jack: Rank.Jack,
    Queen: Rank.Queen,
    King: Rank.King,
};
