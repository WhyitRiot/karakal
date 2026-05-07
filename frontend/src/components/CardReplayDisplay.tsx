import React from 'react';
import type {Card} from "../utilities/types/card.ts";
import ReplayCardItem from "./ReplayCardItem.tsx";
import {getCardStyling} from "../utilities/cardImages.ts";

const CardReplayDisplay = ({hand} : {hand : Card[]}) => {
    return (
        <div className={"flex flex-row gap-3"}>
            {hand.map(card =>
                <ReplayCardItem card={card}/>
            )}
        </div>
    );
};

export default CardReplayDisplay;