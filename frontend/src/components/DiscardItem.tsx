import React, {useContext} from 'react';
import {type Card, getCardRank} from "../utilities/card.ts"
import {GameStateContext} from "../utilities/websocket/GameStateContext.tsx";

const DiscardItem = ({card} : {card: Card}) => {
    const context = useContext(GameStateContext);
    if(!context) throw Error("outside of provider!");
    const {discardHand, removeCard} = context;
    const {suit, rank} = card;
    const removeThisCard = () => {
        removeCard(card);
    }
    return (
        <div onClick={removeThisCard} className={"flex flex-col border rounded items-center hover:shadow-2xl hover:cursor-pointer"}>
            <p>{suit}</p>
            <p>{getCardRank(rank)}</p>
        </div>
    );
};

export default DiscardItem;