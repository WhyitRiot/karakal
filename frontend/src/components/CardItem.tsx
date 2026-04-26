import React, {useContext, useEffect, useState} from 'react';
import {type Card, getCardRank} from "../utilities/card.ts";
import {GameStateContext} from "../utilities/websocket/GameStateContext.tsx";
import {isNewCardSameRank, doesNewCardContinueSuitedStraight} from "../utilities/cardBools.ts"
import discardItem from "./DiscardItem.tsx";

const CardItem = ({card} : {card: Card}) => {
    const [added, setAdded] = useState(false);
    const context = useContext(GameStateContext);
    if (!context){
        throw Error("outside of provider");
    }
    const {discardHand, addCard, removeCard} = context;
    const [canAddCard, setCanAddCard] = useState(isNewCardSameRank(discardHand, card) || doesNewCardContinueSuitedStraight(discardHand, card));
    const {id, rank, suit} = card;

    useEffect(()=>{
        setCanAddCard(isNewCardSameRank(discardHand, card) || doesNewCardContinueSuitedStraight(discardHand, card));
    })

    const removeThisCard = () => {
        removeCard(card);
        setAdded(false);
    }

    const addThisCard = () => {
        if (isNewCardSameRank(discardHand, card) || doesNewCardContinueSuitedStraight(discardHand, card)){
            addCard(card);
            setAdded(true);
        }
    }
    return (
        <div onClick={!added ? addThisCard : removeThisCard} className={`flex flex-col border rounded items-center hover:cursor-pointer 
        ${added && `text-shadow-amber-400/30 -translate-y-10`}
        ${!canAddCard && !added && `bg-gray-400/30`}`}>
            {suit && <p>{suit}</p>}
            <p>{getCardRank(rank)}</p>
        </div>
    );
};

export default CardItem;