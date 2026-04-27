import {motion, type HTMLMotionProps} from "framer-motion";
import type {Card} from "../utilities/card.ts";
import {GameStateContext} from "../utilities/websocket/GameStateContext.tsx";
import {useContext, useEffect, useState} from "react";
import {doesNewCardContinueSuitedStraight, isNewCardSameRank} from "../utilities/cardBools.ts";
import back from "../assets/cards/blue-back.jpg"
export function AnimatedCardItem ({card, handleClick, ...motionProps} : CardProps){
    const context = useContext(GameStateContext);

    if (!context) throw Error("outside of provider!");
    const {discardHand, addCard, removeCard} = context;
    const [canSelect, setCanSelect] = useState(isNewCardSameRank(discardHand, card) || doesNewCardContinueSuitedStraight(discardHand, card));

    useEffect(()=>{
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCanSelect(isNewCardSameRank(discardHand, card) || doesNewCardContinueSuitedStraight(discardHand, card))
    })

    return (
        <div className={"w-32 h-48 perspective-[1000px]"}>
            <motion.div
                initial={{ opacity: 0, y: 30, rotateY: 180 }}
                animate={{
                    opacity: canSelect ? 1 : 0.5,
                    y: 0,
                    x: 0,
                    rotateY: 0
                }}
                exit={{ opacity: 0, y: -40, scale: 0.9 }}
                transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 20,
                    rotateY: {duration: 0.8}
                }}
                style={{transformStyle: "preserve-3d", transformOrigin: "center"}}
                onClick={() => handleClick(card)}
                {...motionProps}
                whileHover={{scale: canSelect ? 1.25 : 1, y: -10}}
                whileTap={{scale: 0.95}}
                className={"relative w-full h-full"}
            >
                <motion.div
                    transition={{duration: 0.8}}
                    animate={{rotateY: 0}}
                    className={"absolute inset-0"}
                style={{backfaceVisibility: "hidden"}}
                >
                    <img className={"w-full h-full"} src={getCardStyling(card)} alt={card.suit + " " + card.rank}/>
                </motion.div>
                <motion.div
                    transition={{duration: 0.8}}
                    animate={{rotateY: 180}}
                    className={"absolute inset-0"}
                style={{backfaceVisibility: "hidden", transform: "rotateY(180deg)"}}
                >
                    <img className={"w-full h-full"} src={back} alt="back"/>
                </motion.div>
            </motion.div>
        </div>
)
}

import {getCardStyling} from "../utilities/cardImages.ts";


type CardProps = {
    card: Card,
    handleClick : (card: Card) => void;
} & HTMLMotionProps<"div">
