import type {Card} from "./card.ts";
import {Rank} from "./rank.ts"

export const isNewCardSameRank = (prev : Card[], newCard : Card) : boolean => {
    if (prev.length === 0){
        return true;
    }
    if (newCard.rank === 0){
        return true;
    }
    let checkIndex = 1;
    let checkRank = newCard.rank -1;
    let checkCard = prev[prev.length-1]
    while(checkCard.rank === Rank.Joker && checkIndex < prev.length){
        checkCard = prev[prev.length-checkIndex++]
        checkRank--;
    }
    return prev[prev.length - 1].rank === newCard.rank;
}

export const doesNewCardContinueSuitedStraight = (prev : Card[], newCard: Card) : boolean =>{
    if (prev.length === 0){
        return true;
    }
    if (newCard.rank === 0){
        return true;
    }
    prev = prev.sort((a,b) => a.rank -b.rank)
    return doesNewCardContinueSuitedStraightPositive(prev, newCard) || doesNewCardContinueSuitedStraightNegative(prev, newCard)
}

export const doesNewCardContinueSuitedStraightPositive = (prev : Card[], newCard : Card) : boolean => {
    let checkIndex = 1;
    let checkRank = newCard.rank -1;
    let checkCard = prev[prev.length-checkIndex]
        while(checkCard.rank === Rank.Joker && checkIndex <= prev.length){
            checkCard = prev[prev.length-checkIndex++]
            checkRank--;
        }
    if (checkCard.rank === Rank.Joker){
        return true;
    }
    if (checkCard.suit != newCard.suit){
        return false;
    }
    return checkCard.rank === checkRank;
}

export const doesNewCardContinueSuitedStraightNegative = (prev : Card[], newCard : Card) : boolean => {
    let checkIndex = 1;
    let checkRank = newCard.rank +1;
    let checkCard = prev[prev.length-checkIndex]
    while(checkCard.rank === Rank.Joker && checkIndex <= prev.length){
        checkCard = prev[prev.length-checkIndex++]
        checkRank++;
    }
    if (checkCard.rank === Rank.Joker){
        return true;
    }
    if (checkCard.suit != newCard.suit){
        return false;
    }
    return checkCard.rank === checkRank;
}


