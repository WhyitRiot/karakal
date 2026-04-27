import React, {useContext, useState} from 'react';
import CardItem from "../components/CardItem.tsx";
import {type Card} from "../utilities/card.ts"
import {Rank} from "../utilities/rank.ts";
import {Suit} from "../utilities/suit.ts"
import {GameStateContext} from "../utilities/websocket/GameStateContext.tsx";
import {getCardStyling} from "../utilities/cardImages.ts";
import {LayoutGroup, AnimatePresence} from "framer-motion";
import {AnimatedCardItem} from "../components/AnimatedCardItem.tsx";
import {doesNewCardContinueSuitedStraight, isNewCardSameRank} from "../utilities/cardBools.ts";

const hand : Card[] = [
    {id: 1, rank: Rank.Joker, suit: undefined, state: "hand" },
    {id: 4,  rank: Rank.Ten, suit: Suit.Spades, state: "hand" },
    {id: 7, rank: Rank.King, suit: Suit.Diamonds, state: "hand" },
    {id: 8, rank: Rank.Queen, suit: Suit.Clubs, state: "hand" },
    {id: 14, rank: Rank.Joker, suit: undefined, state: "hand" },
    {id: 15, rank: Rank.Nine, suit: Suit.Spades, state: "hand" },
    {id: 43, rank: Rank.Eight, suit: Suit.Diamonds, state: "hand" }
];

const Game = () => {
    const context = useContext(GameStateContext);
    if (!context) throw Error("outside of provider!");
    const{discardHand, addCard, removeCard} = context;
    const[currhand, setCurrHand] = useState<Card[]>(hand);

    const removeThisCard = (card : Card) => {
        removeCard(card);
        setCurrHand(prev => prev.map(c => c.id === card.id ? {...c, state: "hand"} : c))
    }

    const addThisCard = (card : Card) => {
        if (isNewCardSameRank(discardHand, card) || doesNewCardContinueSuitedStraight(discardHand, card)){
            addCard(card);
            setCurrHand(prev => prev.map(c => c.id === card.id ? {...c, state: "selected"} : c))
        }
    }
    return (
            <div className={"relative w-screen h-screen overflow-hidden"}>

                    <div className={"absolute top-4 w-full flex justify-center gap-5"}>
                        <p className={"border rounded px-2"}>Discard</p>
                        <p className={"border rounded px-2"}>Deck</p>
                    </div>

                    <div className={"absolute inset-0 flex items-center justify-center"}>
                        <AnimatePresence>
                            {currhand.filter(card => card.state === "selected").map(card =>
                                <AnimatedCardItem key={card.id} card={card} handleClick={removeThisCard}/>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className={"absolute bottom-4 w-full flex justify-center gap-3 min-h-[200px]"}>
                        <AnimatePresence>
                            {currhand.filter(card => card.state === "hand").map(card => (
                                <AnimatedCardItem key={card.id} card={card} handleClick={addThisCard}/>
                            ))}
                        </AnimatePresence>
                    </div>

            </div>
    );
};

export default Game;