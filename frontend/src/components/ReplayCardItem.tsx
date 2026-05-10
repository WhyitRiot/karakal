import React from 'react';
import {getCardStyling} from "../utilities/cardImages.ts";
import {type Card, rankMap} from "../utilities/types/card.ts";

const ReplayCardItem = ({card} : {card : Card}) => {
    const resolvedCard : Card = {...card, rank: rankMap[card.rank]}
    console.log("Card styling: ", getCardStyling(resolvedCard))
    return (
        <div className={"w-32 h-48"}>
            <img className={"w-full h-full"} src={getCardStyling(resolvedCard)} alt={resolvedCard.suit + " " + resolvedCard.rank}/>
        </div>
    );
};

export default ReplayCardItem;