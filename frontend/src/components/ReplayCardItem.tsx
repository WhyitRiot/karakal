import React from 'react';
import {getCardStyling} from "../utilities/cardImages.ts";

const ReplayCardItem = ({card} : {card : Card}) => {
    return (
        <div className={"w-32 h-48"}>
            <img className={"w-full h-full"} src={getCardStyling(card)} alt={card.suit + " " + card.rank}/>
        </div>
    );
};

export default ReplayCardItem;