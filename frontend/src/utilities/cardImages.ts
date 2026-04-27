import cardBack from "../assets/cards/blue-back.jpg"

import joker from "../assets/cards/joker.jpg"
import joker2 from "../assets/cards/joker2.jpg"

import aceSpade from "../assets/cards/aceSpade.jpg"
import twoSpade from "../assets/cards/twoSpade.jpg"
import threeSpade from "../assets/cards/threeSpade.jpg"
import fourSpade from "../assets/cards/fourSpade.jpg"
import fiveSpade from "../assets/cards/fiveSpade.jpg"
import sixSpade from "../assets/cards/sixSpade.jpg"
import sevenSpade from "../assets/cards/sevenSpade.jpg"
import eightSpade from "../assets/cards/eightSpade.jpg"
import nineSpade from "../assets/cards/nineSpade.jpg"
import tenSpade from "../assets/cards/tenSpade.jpg"
import jackSpade from "../assets/cards/jackSpade.jpg"
import queenSpade from "../assets/cards/queenSpade.jpg"
import kingSpade from "../assets/cards/kingSpade.jpg"

import aceHeart from "../assets/cards/aceHeart.jpg"
import twoHeart from "../assets/cards/twoHeart.jpg"
import threeHeart from "../assets/cards/threeHeart.jpg"
import fourHeart from "../assets/cards/fourHeart.jpg"
import fiveHeart from "../assets/cards/fiveHeart.jpg"
import sixHeart from "../assets/cards/sixHeart.jpg"
import sevenHeart from "../assets/cards/sevenHeart.jpg"
import eightHeart from "../assets/cards/eightHeart.jpg"
import nineHeart from "../assets/cards/nineHeart.jpg"
import tenHeart from "../assets/cards/tenHeart.jpg"
import jackHeart from "../assets/cards/jackHeart.jpg"
import queenHeart from "../assets/cards/queenHeart.jpg"
import kingHeart from "../assets/cards/kingHeart.jpg"

import aceDiamond from "../assets/cards/aceDiamond.jpg"
import twoDiamond from "../assets/cards/twoDiamond.jpg"
import threeDiamond from "../assets/cards/threeDiamond.jpg"
import fourDiamond from "../assets/cards/fourDiamond.jpg"
import fiveDiamond from "../assets/cards/fiveDiamond.jpg"
import sixDiamond from "../assets/cards/sixDiamond.jpg"
import sevenDiamond from "../assets/cards/sevenDiamond.jpg"
import eightDiamond from "../assets/cards/eightDiamond.jpg"
import nineDiamond from "../assets/cards/nineDiamond.jpg"
import tenDiamond from "../assets/cards/tenDiamond.jpg"
import jackDiamond from "../assets/cards/jackDiamond.jpg"
import queenDiamond from "../assets/cards/queenDiamond.jpg"
import kingDiamond from "../assets/cards/kingDiamond.jpg"

import aceClub from "../assets/cards/aceClub.jpg"
import twoClub from "../assets/cards/twoClub.jpg"
import threeClub from "../assets/cards/threeClub.jpg"
import fourClub from "../assets/cards/fourClub.jpg"
import fiveClub from "../assets/cards/fiveClub.jpg"
import sixClub from "../assets/cards/sixClub.jpg"
import sevenClub from "../assets/cards/sevenClub.jpg"
import eightClub from "../assets/cards/eightClub.jpg"
import nineClub from "../assets/cards/nineClub.jpg"
import tenClub from "../assets/cards/tenClub.jpg"
import jackClub from "../assets/cards/jackClub.jpg"
import queenClub from "../assets/cards/queenClub.jpg"
import kingClub from "../assets/cards/kingClub.jpg"

import {Rank} from "../utilities/rank.ts"
import {type Card, getCardRank} from "./card.ts";
import React from "react";
import {Suit} from "./suit.ts";

export const cardBacks = {
    cardBack: cardBack
}

export const rankNames: Record<number, string> = {
    [Rank.Ace]: "ace",
    [Rank.Two]: "two",
    [Rank.Three]: "three",
    [Rank.Four]: "four",
    [Rank.Five]: "five",
    [Rank.Six]: "six",
    [Rank.Seven]: "seven",
    [Rank.Eight]: "eight",
    [Rank.Nine]: "nine",
    [Rank.Ten]: "ten",
    [Rank.Jack]: "jack",
    [Rank.Queen]: "queen",
    [Rank.King]: "king"
} as const;

export const Jokers = {
    jokerOne : joker,
    jokerTwo : joker2
}

export const Spades = {
    ace: aceSpade,
    two: twoSpade,
    three: threeSpade,
    four: fourSpade,
    five: fiveSpade,
    six: sixSpade,
    seven: sevenSpade,
    eight: eightSpade,
    nine: nineSpade,
    ten: tenSpade,
    jack: jackSpade,
    queen: queenSpade,
    king: kingSpade
};

export const Hearts = {
    ace: aceHeart,
    two: twoHeart,
    three: threeHeart,
    four: fourHeart,
    five: fiveHeart,
    six: sixHeart,
    seven: sevenHeart,
    eight: eightHeart,
    nine: nineHeart,
    ten: tenHeart,
    jack: jackHeart,
    queen: queenHeart,
    king: kingHeart
};

export const Diamonds = {
    ace: aceDiamond,
    two: twoDiamond,
    three: threeDiamond,
    four: fourDiamond,
    five: fiveDiamond,
    six: sixDiamond,
    seven: sevenDiamond,
    eight: eightDiamond,
    nine: nineDiamond,
    ten: tenDiamond,
    jack: jackDiamond,
    queen: queenDiamond,
    king: kingDiamond
};

export const Clubs = {
    ace: aceClub,
    two: twoClub,
    three: threeClub,
    four: fourClub,
    five: fiveClub,
    six: sixClub,
    seven: sevenClub,
    eight: eightClub,
    nine: nineClub,
    ten: tenClub,
    jack: jackClub,
    queen: queenClub,
    king: kingClub
};

export const getCardStyling = (card : Card) =>{
    if (card.suit === undefined){
        return Jokers["jokerOne"];
    }
    let imgObject;
    switch (card.suit){
        case Suit.Clubs: imgObject = Clubs; break;
        case Suit.Hearts: imgObject = Hearts; break;
        case Suit.Spades: imgObject = Spades; break;
        case Suit.Diamonds: imgObject = Diamonds; break;
        default: imgObject = Jokers; break;
    }
    const rankKey = rankNames[card.rank]
    return imgObject[rankKey as keyof typeof imgObject];
}
