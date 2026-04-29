import {motion, type HTMLMotionProps} from "framer-motion";
import type {Card} from "../utilities/card.ts";
import {GameStateContext} from "../utilities/websocket/GameStateContext.tsx";
import {useContext, useEffect, useState} from "react";
import {doesNewCardContinueSuitedStraight, isNewCardSameRank, getHandMode, type HandMode} from "../utilities/cardBools.ts";
import back from "../assets/cards/blue-back.jpg"
import {getCardStyling} from "../utilities/cardImages.ts";


type CardProps = {
    card: Card,
    deck : boolean,
    selectable : boolean,
    moveFunction? : (card: Card) => void;
} & HTMLMotionProps<"div">

export function AnimatedCardItem ({card, deck, selectable, moveFunction, ...motionProps} : CardProps){
    const context = useContext(GameStateContext);

    if (!context) throw Error("outside of provider!");
    const {discardHand, addCard, removeCard} = context;
    const [canSelect, setCanSelect] = useState((isNewCardSameRank(discardHand, card) || doesNewCardContinueSuitedStraight(discardHand, card)));
    const [isFlipped, setIsFlipped] = useState(deck);

    useEffect(()=>{
        if (!selectable) return;
        let modeBool : boolean;
        const mode = getHandMode(discardHand);
        switch (mode){
            case "unknown" : modeBool = (isNewCardSameRank(discardHand, card) || doesNewCardContinueSuitedStraight(discardHand, card)); break;
            case "sameRank" : modeBool = (isNewCardSameRank(discardHand, card)); break;
            case "straight" : modeBool = (doesNewCardContinueSuitedStraight(discardHand, card));
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCanSelect(modeBool)
    }, [discardHand, card, selectable])

    const handleClickable = async () => {
        if (!moveFunction) return;
        if (deck){
            await handleFlip()
            return;
        }
        moveFunction(card);
    }

    const handleFlip = async () => {
        setIsFlipped(false);
        setTimeout(()=>{
            if (!moveFunction) return;
            moveFunction(card);
        }, 1000)
    }

    return (
        <div className={"w-32 h-48 perspective-[1000px] rounded"}>
            <motion.div
                layout
                initial={{ rotateY: deck ? 180 : 0 }}
                animate={{
                    opacity: canSelect || deck ? 1 : 0.5,
                    y: 0,
                    x: 0,
                    rotateY: (isFlipped ? 180 : 0)
                }}
                exit={{ opacity: 0, y: -40, scale: 0.9 }}
                transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 20,
                    duration: 0.5,
                }}
                style={{transformStyle: "preserve-3d", position: "relative", height:"100%", width: "100%", }}
                onClick={handleClickable}
                {...motionProps}
                whileHover={{scale: canSelect ? 1.10 : 1, y: -10}}
                whileTap={{scale: 0.95}}
                className={"relative w-full h-full hover:cursor-pointer"}
            >
                {/*{front}*/}
                <div className={"absolute inset-0 w-full h-full overflow-hidden"}
                style={{
                    WebkitBackfaceVisibility: "hidden",
                    backfaceVisibility: "hidden",
                }}
                >
                    <img className={"w-full h-full"} src={getCardStyling(card)} alt={card.suit + " " + card.rank}/>
                </div>
                {/*{back}*/}
                <div className={"absolute inset-0 w-full h-full overflow-hidden"}
                style={{
                    WebkitBackfaceVisibility: "hidden",
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)"
                }}
                >
                    <img className={"w-full h-full"} src={back} alt="back"/>
                </div>
            </motion.div>
        </div>
)
}
