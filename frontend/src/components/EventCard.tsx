import React from 'react';
import type {GameEvent} from "../utilities/context/types/GameEvent.ts";
import CardReplayDisplay from "./CardReplayDisplay.tsx";
import ReplayCardItem from "./ReplayCardItem.tsx"

const EventCard = ({eventItem} : {eventItem : GameEvent}) => {
    return (
        <div className={"flex flex-col gap-5"}>
            <div>
                <p>{eventItem.username + "'s turn"}</p>
                { (eventItem.action_type === "DECK" || eventItem.action_type === "DISCARD") ?
                    <>
                        <p>Discard:</p>
                        <CardReplayDisplay hand={eventItem.action.discard}/>
                        <p>{eventItem.action.action_type === "DISCARD" ? "Draw from Discard" : "Draw from Deck"}</p>
                        <ReplayCardItem card={eventItem.action.draw}/>
                    </>
                    :
                    <>
                    {
                        eventItem.action_type === "KARAKAL" ?
                        <>
                        <p>
                        KARAKAL
                        </p>
                        </>
                            :
                            <><p>STAY</p></>
                    }
                    </>
                }
            </div>
        </div>
    );
};

export default EventCard;