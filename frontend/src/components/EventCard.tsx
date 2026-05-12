import React from 'react';
import type {GameEvent} from "../utilities/context/types/GameEvent.ts";
import CardReplayDisplay from "./CardReplayDisplay.tsx";
import ReplayCardItem from "./ReplayCardItem.tsx"

const EventCard = ({eventItem} : {eventItem : GameEvent}) => {
    return (
        <div className={"flex flex-col gap-5"}>
            <div className='flex flex-col gap-3'>
                <p className='border-b'>{eventItem.username + "'s turn"}</p>
                { (eventItem.action.discard && eventItem.action.draw) ?
                    <>  
                        <div className='flex flex-row justify-between'>
                            <div className='flex flex-col'>
                                <p>Discard:</p>
                                <CardReplayDisplay hand={eventItem.action.discard}/>
                            </div>
                            <div className='flex flex-col'>
                                <p>{eventItem.action_type === "DISCARD" ? "Draw from Discard" : "Draw from Deck"}</p>
                                <ReplayCardItem card={eventItem.action.draw}/>
                            </div>
                        </div>
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
                        <>
                            <p>STAY</p>
                        </>
                    }
                    </>
                }
            </div>
        </div>
    );
};

export default EventCard;