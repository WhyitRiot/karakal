import React, {useContext, useEffect, useState} from 'react';
import CardItem from "../components/CardItem.tsx";
import {type Card, type CardState} from "../utilities/card.ts"
import {Rank} from "../utilities/rank.ts";
import {Suit} from "../utilities/suit.ts"
import {GameStateContext} from "../utilities/websocket/GameStateContext.tsx";
import {cardBacks, getCardStyling} from "../utilities/cardImages.ts";
import {LayoutGroup, AnimatePresence, motion} from "framer-motion";
import {AnimatedCardItem} from "../components/AnimatedCardItem.tsx";
import {
    doesNewCardContinueSuitedStraight,
    isNewCardSameRank,
    isValidSelection,
    validateEntireHand
} from "../utilities/cardBools.ts";
import AnimatedDeckPile from "../components/AnimatedDeckPile.tsx";

const MAX_VISIBLE_LAYERS = 10;

const Game = () => {
    const context = useContext(GameStateContext);
    if (!context) throw Error("outside of provider!");
    const{tableCards, setTableCards, discardAction, drawAction, callAction} = context;
    const deckSize = 40;
    const[layers, setLayers] = useState(Math.min(MAX_VISIBLE_LAYERS, Math.ceil(deckSize/5)));

    const [discardHand, setDiscardHand] = useState<Card[]>([]);
    const [pickedUpCard, setPickedUpCard] = useState<boolean>(false);


    const moveCardToSelected = (cardId: number) => {
        setTableCards(prev => prev.map(card => card.id === cardId ? {...card, state: "selected"} : card));
    }

    const moveCardToHand = (cardId : number) => {
        setTableCards(prev => prev.map(card => card.id === cardId ? {...card, state: "hand"} : card));
    }

    const moveCardToStage = (cardId : number) => {
        setTableCards(prev => prev.map(card => card.id === cardId ? {...card, state: "staged"} : card));
    }

    const moveCardToDiscard = (cardId : number) => {
        setTableCards(prev => prev.map(card => card.id === cardId ? {...card, state: "discard"} : card));
    }

    const pickUpCard = () => {
        setPickedUpCard(true);
    }
    const resetDiscardHand = () => {
        setDiscardHand([]);
    }

    const addCard = (card : Card) => {
        setDiscardHand(prev => [...prev, card].sort((a,b) => {
            if (a.rank === Rank.Joker || b.rank === Rank.Joker) return 0;
            return a.rank -b.rank
        }));
    }

    const discard = () => {
        discardAction(discardHand.map(card => card.id));
        resetDiscardHand()
    }

    useEffect(()=>{
        console.log(tableCards);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLayers(Math.min(MAX_VISIBLE_LAYERS, Math.ceil(deckSize / 5)));
    }, [deckSize, tableCards])

    const stageLocal = () => {
        if (!validateEntireHand(discardHand)) return;
        console.log(discardHand);
        discardHand.forEach(card => moveCardToStage(card.id));
    }

    const moveSelectedCardsToDiscard = () => {
        if (!discardHand) return;
        discardHand.forEach(card => moveCardToDiscard(card.id));
        discard();
    }

    const drawFromDiscard = (card : Card) => {
        if (pickedUpCard) return;
        //TODO add logic for adding card from context to local hand
        pickUpCard();
        moveSelectedCardsToDiscard()
        drawAction("DISCARD", card.id);
    }

    const drawFromDeck = () =>{
        pickUpCard();
        moveSelectedCardsToDiscard()
        drawAction("DECK");
    }

    const resetLocalDiscardHand = () => {
        discardHand.forEach(card => moveCardToHand(card.id))
        resetDiscardHand();
    }

    const removeThisCard = (card : Card) => {
        moveCardToHand(card.id);
        discardHand.filter(c => c.id != card.id);
    }

    const removeFromDeck = (card : Card) =>{
        moveCardToHand(card.id);
    }

    const addThisCard = (card : Card) => {
        if (!isValidSelection(discardHand, card)) return;
        addCard(card);
        moveCardToSelected(card.id);
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
                                        {tableCards
                                            .filter(card => card.state === "discard")
                                            .map((card, index, array) => {
                                                return (
                                                    <AnimatedDeckPile key={card.id} totalCards={array.length} card={card} index={index}>
                                                        <AnimatedCardItem
                                                            layoutId={card.id.toString()}
                                                            card={card}
                                                            deck={false}
                                                            selectable={false}
                                                            discardHand={discardHand}
                                                            moveFunction={() => {
                                                                drawFromDiscard(card);
                                                                console.log("Selected from discard:", card.rank);
                                                            }}
                                                        />
                                                    </AnimatedDeckPile>
                                                );
                                            })
                                        }
                                </motion.div>
                                <h2>Discard</h2>
                            </div>
                            {/*Deck*/}
                            <div className={"w-1/4 flex flex-col items-center border rounded-3xl"}>
                                <div className={"h-48 flex flex-col items-center hover:cursor-pointer"}>
                                    <div className={"relative w-32 h-48 flex flex-row justify-center"}>
                                        <div className="absolute inset-0">
                                            {Array.from({ length: layers }).map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="absolute rounded shadow-md"
                                                    whileHover={{scale: 1.10}}
                                                    style={{
                                                        top: i * 0.6,
                                                        left: i * 0.6,
                                                        zIndex: i
                                                    }}
                                                    onClick={drawFromDeck}

                                                >
                                                    <img src={cardBacks.cardBack} alt="back"/>
                                                </motion.div>
                                            ))}
                                        </div>
                                        <div className={"relative z-50"}>
                                                {tableCards.filter(card => card.state === "deck").map(card =>
                                                    <AnimatedCardItem key={card.id} card={card} deck={true} selectable={true} discardHand={discardHand} moveFunction={removeFromDeck} layoutId={card.id.toString()}/>
                                                )}
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
                                    {tableCards.filter(card => card.state === "staged").map(card =>
                                        <AnimatedCardItem key={card.id} card={card} deck={false} selectable={false} discardHand={discardHand} layoutId={card.id.toString()}/>
                                    )}
                                    {tableCards.filter(card => card.state === "selected").map(card =>
                                        <AnimatedCardItem key={card.id} card={card} deck={false} selectable={false} discardHand={discardHand} moveFunction={removeThisCard} layoutId={card.id.toString()}/>
                                    )}
                            </div>
                        </div>
                    </div>

                    <div className={"h-1/3 w-full flex justify-center gap-3 min-h-[200px]"}>
                            {tableCards.filter(card => card.state === "hand").map(card => (
                                <AnimatedCardItem key={card.id} card={card} deck={false} selectable={true} discardHand={discardHand} moveFunction={addThisCard} layoutId={card.id.toString()}/>
                            ))}
                    </div>
                </LayoutGroup>

            </div>
    );
};

export default Game;