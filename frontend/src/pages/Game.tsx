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
    {id: 43, rank: Rank.Eight, suit: Suit.Diamonds, state: "hand" },
    {id: 66, rank: Rank.Ace, suit: Suit.Diamonds, state: "deck"}
];

const Game = () => {
    const context = useContext(GameStateContext);
    if (!context) throw Error("outside of provider!");
    const{discardHand, tableCards, addCard, removeCard, discard, resetDiscardHand} = context;
    const[currhand, setCurrHand] = useState<Card[]>(tableCards);

    const discardLocal = () => {
        setCurrHand(prev => prev.map(c => c.state === "selected" ? {...c, state: "discard"}: c))
        discard();
    }

    const drawFromDeck = (card : Card) =>{
        setCurrHand(prev => prev.map(c => c.id === card.id ? {...c, state: "hand"} : c))
    }

    const resetLocalDiscardHand = () => {
        setCurrHand(prev => prev.map(c => c.state === "selected" ? {...c, state: "hand"} : c))
        resetDiscardHand();
    }

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
                <LayoutGroup>

                    <div className={"absolute top-4 w-full flex flex-row justify-center gap-5"}>
                        <p className={"border rounded px-2"}>Discard</p>
                        <p className={"border rounded px-2"}>Deck</p>
                    </div>

                        <div className={"h-1/3 w-full flex items-center justify-center ml-2 mr-2 gap-10"}>
                            <div className={"w-1/4 flex flex-col items-center border rounded-3xl"}>
                                <div className={"h-48 flex flex-col items-center"}>
                                    <div className={"relative w-32 h-48 flex flex-row justify-center"}>
                                        <AnimatePresence>
                                            {currhand.filter(card => card.state === "discard").map(card =>
                                                <AnimatedCardItem key={card.id} card={card} deck={false} layoutId={card.id.toString()}/>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                                <h2>Discard</h2>
                            </div>
                            <div className={"w-1/4 flex flex-col items-center border rounded-3xl"}>
                                <div className={"h-48 flex flex-col items-center"}>
                                    <div className={"relative w-32 h-48 flex flex-row justify-center"}>
                                        <AnimatePresence>
                                            {currhand.filter(card => card.state === "deck").map(card =>
                                                <AnimatedCardItem key={card.id} card={card} deck={true} moveFunction={drawFromDeck} layoutId={card.id.toString()}/>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                                <h2>Deck</h2>
                            </div>
                        </div>

                    <div className={"h-1/3 w-full flex items-center justify-center"}>
                        <div className={"flex flex-col items-center gap-3"}>
                            {discardHand.length > 0 && <div className={"flex flex-row gap-3"}>
                                <button
                                    className={"border rounded p-2 hover:cursor-pointer"}
                                onClick={discardLocal}>Discard</button>
                                <button
                                className={"border rounded p-2 hover:cursor-pointer"}
                            onClick={resetLocalDiscardHand}>Cancel</button>
                            </div>
                            }
                            <div className={"flex flex-row"}>
                                <AnimatePresence>
                                    {currhand.filter(card => card.state === "selected").map(card =>
                                        <AnimatedCardItem key={card.id} card={card} deck={false} moveFunction={removeThisCard} layoutId={card.id.toString()}/>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    <div className={"h-1/3 w-full flex justify-center gap-3 min-h-[200px]"}>
                        <AnimatePresence>
                            {currhand.filter(card => card.state === "hand").map(card => (
                                <AnimatedCardItem key={card.id} card={card} deck={false} moveFunction={addThisCard} layoutId={card.id.toString()}/>
                            ))}
                        </AnimatePresence>
                    </div>
                </LayoutGroup>

            </div>
    );
};

export default Game;