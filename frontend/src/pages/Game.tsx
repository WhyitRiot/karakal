import React, {useContext, useEffect, useState} from 'react';
import CardItem from "../components/CardItem.tsx";
import {type Card, type CardState} from "../utilities/card.ts"
import {Rank} from "../utilities/rank.ts";
import {Suit} from "../utilities/suit.ts"
import {GameStateContext} from "../utilities/websocket/GameStateContext.tsx";
import {cardBacks, getCardStyling} from "../utilities/cardImages.ts";
import {LayoutGroup, AnimatePresence, motion} from "framer-motion";
import {AnimatedCardItem} from "../components/AnimatedCardItem.tsx";
import {doesNewCardContinueSuitedStraight, isNewCardSameRank, validateEntireHand} from "../utilities/cardBools.ts";
import AnimatedDeckPile from "../components/AnimatedDeckPile.tsx";

const MAX_VISIBLE_LAYERS = 10;

const Game = () => {
    const context = useContext(GameStateContext);
    if (!context) throw Error("outside of provider!");
    const{discardHand, tableCards, addCard, removeCard, discard, resetDiscardHand, pickedUpCard, pickUpCard} = context;
    const deckSize = 40;
    const[currTableCards, setCurrTableCards] = useState<Card[]>(tableCards);
    const[layers, setLayers] = useState(Math.min(MAX_VISIBLE_LAYERS, Math.ceil(deckSize/5)));
    useEffect(()=>{
        setCurrTableCards(tableCards)
    }, [tableCards])

    useEffect(()=>{
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLayers(Math.min(MAX_VISIBLE_LAYERS, Math.ceil(deckSize / 5)));
    }, [deckSize])

    const stageLocal = () => {
        if (!validateEntireHand(discardHand)) return;
        setCurrTableCards(prev => prev.map(c => c.state === "selected" ? {...c, state: "staged"}: c))
        discard();
    }

    const discardLocal = () => {
        setCurrTableCards(prev => {
            const staged : Card[] = prev.filter(c => c.state === "staged");
            const rest: Card[] = prev.filter(c => c.state !== "staged");

            return [
                ...rest,
                ...staged.map(c => ({ ...c, state: "discard" as CardState }))
            ];
        });
    }

    const selectFromDiscardLocal = (card : Card) => {
        if (pickedUpCard) return;
        //TODO add logic for adding card from context to local hand
        setCurrTableCards(prev => prev.map(c => c.id === card.id ? {...c, state: "hand"} : c));
        pickUpCard();
        discardLocal();
    }

    const drawFromDeck = (card : Card) =>{
        setCurrTableCards(prev => prev.map(c => c.id === card.id ? {...c, state: "hand"} : c))
        discardLocal();
    }

    const resetLocalDiscardHand = () => {
        setCurrTableCards(prev => prev.map(c => c.state === "selected" ? {...c, state: "hand"} : c))
        resetDiscardHand();
    }

    const removeThisCard = (card : Card) => {
        removeCard(card);
        setCurrTableCards(prev => prev.map(c => c.id === card.id ? {...c, state: "hand"} : c))
    }

    const addThisCard = (card : Card) => {
        if (isNewCardSameRank(discardHand, card) || doesNewCardContinueSuitedStraight(discardHand, card)){
            addCard(card);
            setCurrTableCards(prev => prev.map(c => c.id === card.id ? {...c, state: "selected"} : c))
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
                                <motion.div
                                    className="relative w-32 h-48"
                                    initial="rest"
                                    whileHover="hover"
                                >
                                    {/*Discard*/}
                                    <AnimatePresence>
                                        {currTableCards
                                            .filter(card => card.state === "discard")
                                            .map((card, index, array) => {
                                                return (
                                                    <AnimatedDeckPile key={card.id} totalCards={array.length} card={card} index={index}>
                                                        <AnimatedCardItem
                                                            card={card}
                                                            deck={false}
                                                            selectable={false}
                                                            moveFunction={() => {
                                                                selectFromDiscardLocal(card);
                                                                console.log("Selected from discard:", card.rank);
                                                            }}
                                                        />
                                                    </AnimatedDeckPile>
                                                );
                                            })
                                        }
                                    </AnimatePresence>
                                </motion.div>
                                <h2>Discard</h2>
                            </div>
                            {/*Deck*/}
                            <div className={"w-1/4 flex flex-col items-center border rounded-3xl"}>
                                <div className={"h-48 flex flex-col items-center"}>
                                    <div className={"relative w-32 h-48 flex flex-row justify-center"}>
                                        <div className="absolute inset-0">
                                            {Array.from({ length: layers }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="absolute rounded shadow-md"
                                                    style={{
                                                        top: i * 0.6,
                                                        left: i * 0.6,
                                                        zIndex: i
                                                    }}
                                                >
                                                    <img src={cardBacks.cardBack} alt="back"/>
                                                </div>
                                            ))}
                                        </div>
                                        <div className={"relative z-50"}>
                                            <AnimatePresence>
                                                {currTableCards.filter(card => card.state === "deck").map(card =>
                                                    <AnimatedCardItem key={card.id} card={card} deck={true} selectable={true} moveFunction={drawFromDeck} layoutId={card.id.toString()}/>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>
                                <h2>Deck</h2>
                            </div>
                        </div>

                    {/*Hand*/}
                    <div className={"h-1/3 w-full flex items-center justify-center"}>
                        <div className={"flex flex-col items-center gap-3"}>
                            {discardHand.length > 0 && <div className={"flex flex-row gap-3"}>
                                <button
                                    className={"border rounded p-2 hover:cursor-pointer"}
                                onClick={stageLocal}>Discard</button>
                                <button
                                className={"border rounded p-2 hover:cursor-pointer"}
                            onClick={resetLocalDiscardHand}>Cancel</button>
                            </div>
                            }
                            <div className={"flex flex-row"}>
                                <AnimatePresence>
                                    {currTableCards.filter(card => card.state === "staged").map(card =>
                                        <AnimatedCardItem key={card.id} card={card} deck={false} selectable={false} layoutId={card.id.toString()}/>
                                    )}
                                </AnimatePresence>
                                <AnimatePresence>
                                    {currTableCards.filter(card => card.state === "selected").map(card =>
                                        <AnimatedCardItem key={card.id} card={card} deck={false} selectable={false} moveFunction={removeThisCard} layoutId={card.id.toString()}/>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    <div className={"h-1/3 w-full flex justify-center gap-3 min-h-[200px]"}>
                        <AnimatePresence>
                            {currTableCards.filter(card => card.state === "hand").map(card => (
                                <AnimatedCardItem key={card.id} card={card} deck={false} selectable={true} moveFunction={addThisCard} layoutId={card.id.toString()}/>
                            ))}
                        </AnimatePresence>
                    </div>
                </LayoutGroup>

            </div>
    );
};

export default Game;