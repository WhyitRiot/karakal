import type {Card} from "./card.ts";
import {Rank} from "./rank.ts"

export const validateEntireHand = (discard : Card[]) : boolean => {
    if (discard.length === 1) return true;
    let isStraight: boolean = true;
    let isSameRank: boolean = true;
    let newCard : Card = discard[0];
    for (let i = 1; i < discard.length; i++){
        if(!isNewCardSameRank(discard.slice(i -1), newCard)){
            isSameRank = false;
            break;
        }else{
            isSameRank = true;
        }
        newCard = discard[i];
    }
    if (discard.length < 3) return isSameRank;
    for (let i = 1; i < discard.length ; i++){
        const prevSlice = discard.slice(0, i);
        const current = discard[i];
        if(!doesNewCardContinueSuitedStraight(prevSlice, current)){
            isStraight = false;
            break;
        }
    }
    return isStraight || isSameRank;
}

export const isNewCardSameRank = (prev : Card[], newCard : Card) : boolean => {
    if (prev.length === 0){
        return true;
    }
    if (newCard.rank === 0){
        return true;
    }
    const lastNonJokerIndex : number = getLastNonJokerIndex(prev);
    if (lastNonJokerIndex<0) return true;
    for (let i = lastNonJokerIndex; i < prev.length; i++){
        const last = prev[i];
        if (last.rank !== newCard.rank){
            return false;
        }
    }
    return true;
}

export const doesNewCardContinueSuitedStraight = (prev : Card[], newCard: Card) : boolean =>{
    if (prev.length === 0){
        return true;
    }
    if (newCard.rank === 0){
        return true;
    }
    const lastNonJokerIndex : number = getLastNonJokerIndex(prev);
    if (lastNonJokerIndex < 0) return true;
    const last = prev[lastNonJokerIndex];
    if (last.suit !== newCard.suit) return false;
    const jokersBetween = prev.length - 1 - lastNonJokerIndex;
    const gap = Math.abs(newCard.rank - last.rank);
    return gap -1 <= jokersBetween;
}

export const getLastNonJokerIndex = (cards : Card[]): number => {
    for (let i = cards.length -1; i >=0; i--){
        if (cards[i].rank !== Rank.Joker) return i;
    }
    return -1;
}
export type HandMode = "unknown" | "sameRank" | "straight";

export const getHandMode = (cards : Card[]): HandMode => {
    if (cards.length < 2) return "unknown";
    const sameRank = cards.every(c => c.rank === cards[0].rank || c.rank === Rank.Joker)
    if (sameRank) return "sameRank";
    return "straight";
}



