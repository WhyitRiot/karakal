import React, {useContext, useEffect, useMemo, useState} from 'react';
import {type Card} from "../utilities/types/card.ts"
import {Rank} from "../utilities/types/rank.ts";
import {GameStateContext} from "../utilities/websocket/GameStateContext.tsx";
import {cardBacks} from "../utilities/cardImages.ts";
import {LayoutGroup, motion} from "framer-motion";
import {AnimatedCardItem} from "../components/AnimatedCardItem.tsx";
import karakalGif from "../assets/Karakal2-trans.gif"
import karakalHover from "../assets/Karakal2Amber-trans.gif"
import stayGif from "../assets/StayGif.gif"
import stayGifHover from "../assets/StayGifOrange.gif"
import GifButton from "../components/GifButton.tsx"
import {
    isValidSelection,
    validateEntireHand
} from "../utilities/cardBools.ts";
import AnimatedDeckPile from "../components/AnimatedDeckPile.tsx";
import StartGameModal from "../components/StartGameModal.tsx";
import WaitForHostModal from "../components/WaitForHostModal.tsx";
import WaitForYourTurnModal from "../components/WaitForYourTurnModal.tsx";
import RoundOverModal from "../components/RoundOverModal.tsx";
import GameOverModal from "../components/GameOverModal.tsx";

const MAX_VISIBLE_LAYERS = 10;

const Game = () => {
    const context = useContext(GameStateContext);
    if (!context) throw Error("outside of provider!");
    const{tableCards, setTableCards, playAction, callAction, stayAction, playerId, isHost, isGameStarted, isMyTurn, currentPlayerName, score, roundOver, gameOver, deckSize, isFinalRound, karakalPlayer} = context;
    const[layers, setLayers] = useState(Math.min(MAX_VISIBLE_LAYERS, Math.ceil(deckSize/5)));

    const[isOpen, setIsOpen] = useState<boolean>(true);

    const [discardHand, setDiscardHand] = useState<Card[]>([]);
    // const [selectedACard, setSelectedACard] = useState<boolean>(false);
    const selectedACard = useMemo(()=>{
        return discardHand.length > 0;
    }, [discardHand])


    const moveCardToSelected = (cardId: number) => {
        setTableCards(prev => prev.map(card => card.id === cardId ? {...card, state: "selected"} : card));
    }

    const moveCardToHand = (cardId : number) => {
        setTableCards(prev => prev.map(card => card.id === cardId ? {...card, state: "hand"} : card));
    }

    const queueCardToMoveToHand = (cardId : number) => {
        setTableCards(prev => prev.map(card => card.id === cardId ? {...card, state: "drawing"} : card));
    }

    const queueCardsToMoveToDiscard = (cardIds : number[]) => {
        const discardSet = new Set(cardIds);

        setTableCards(prev => prev.map(card =>
            discardSet.has(card.id)
                ? { ...card, state: "discard" }
                : card
        ));
    };

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
        queueCardsToMoveToDiscard(discardHand.map(card => card.id));
        resetDiscardHand()
    }

    useEffect(()=>{
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLayers(Math.min(MAX_VISIBLE_LAYERS, Math.ceil(deckSize / 5)));
        console.log(selectedACard);
    }, [deckSize, tableCards])

    const drawFromDiscard = async (card : Card) => {
        if (!selectedACard) return;
        queueCardToMoveToHand(card.id);
        playAction(discardHand.map(card => card.id), "DISCARD", card.id);
        discard();
    }

    const drawFromDeck = async () =>{
        if (!selectedACard) return;
        playAction(discardHand.map(card => card.id), "DECK")
        discard();
    }

    const resetLocalDiscardHand = () => {
        discardHand.forEach(card => moveCardToHand(card.id))
        resetDiscardHand();
    }

    const removeThisCard = (card : Card) => {
        moveCardToHand(card.id);
        setDiscardHand(prev => prev.filter(c => c.id != card.id));
    }

    const removeFromDeck = (card : Card) =>{
        moveCardToHand(card.id);
    }

    const addThisCard = (card : Card) => {
        if (!isValidSelection(discardHand, card)) return;
        addCard(card);
        moveCardToSelected(card.id);
    }
    const karakal = () =>{
        if (score > 10) return;
        callAction();
    }
    const stay = () => {
        stayAction();
    }
    return (
        <>
        { isHost ? <StartGameModal isVisible={isOpen} setIsVisible={setIsOpen}/> : <WaitForHostModal waiting={isGameStarted}/>}
        { (!isMyTurn && isGameStarted) && <WaitForYourTurnModal waiting={isMyTurn} player={currentPlayerName} />}
        {roundOver && <RoundOverModal roundOver={roundOver}/>}
            {gameOver && <GameOverModal gameOver={gameOver}/>}
            <div className={`relative w-screen h-screen overflow-hidden font-[Gloria] ${isFinalRound && "shadow-[inset_0_0_80px_rgba(255,0,0,0.55)]"}`}>
                <LayoutGroup>
                    <div className={"h-[35%] w-full flex items-center justify-center ml-2 mr-2 gap-10"}>
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
                    <div className={"h-[45%]"}>
                        <div className={"h-1/2 w-full flex items-center justify-center"}>
                            {(!selectedACard && isMyTurn) ?
                                isFinalRound ?
                                <GifButton hover={stayGifHover} nonHover={stayGif} click={stay} type={"button"}/>
                                    :
                                    (score <= 10 && (isFinalRound ? karakalPlayer === playerId && isMyTurn : isMyTurn)) &&
                                    <GifButton hover={karakalHover} nonHover={karakalGif} click={karakal} type={"button"}/>
                                :
                                <div className={"flex flex-col items-center gap-3"}>
                                {discardHand.length > 0 && <div className={"flex flex-row gap-3"}>
                                    <button
                                        className={"border rounded p-2 hover:cursor-pointer"}
                                        onClick={resetLocalDiscardHand}>Cancel</button>
                                </div>
                                }
                                <div className={"flex flex-row gap-3"}>
                                    {tableCards.filter(card => card.state === "staged").map(card =>
                                        <AnimatedCardItem key={card.id} card={card} deck={false} selectable={false} discardHand={discardHand} layoutId={card.id.toString()}/>
                                    )}
                                    {tableCards.filter(card => card.state === "selected").map(card =>
                                        <AnimatedCardItem key={card.id} card={card} deck={false} selectable={false} discardHand={discardHand} moveFunction={removeThisCard} layoutId={card.id.toString()}/>
                                    )}
                                </div>
                            </div>}
                        </div>
                        <div className={"h-1/2 flex flex-col justify-end items-end gap-3"}>
                            <div className={"w-full flex justify-center gap-3 min-h-[200px]"}>
                                {tableCards.filter(card => card.state === "hand").map(card => (
                                    <AnimatedCardItem key={card.id} card={card} deck={false} selectable={true} discardHand={discardHand} moveFunction={addThisCard} layoutId={card.id.toString()}/>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={"h-[20%] w-full flex flex-col items-center justify-start"}>
                        <p className={"text-3xl"}>Hand Value</p>
                        <p className={`text-4xl ${score <= 10 && "text-red-600"}`}>{score}</p>
                    </div>
                </LayoutGroup>

            </div>
        </>
    );
};

export default Game;