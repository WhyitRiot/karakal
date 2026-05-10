import {type RoundReplay} from "../utilities/context/types/RoundReplay"
import EventCard from "./EventCard.tsx"

const RoundCard = ({roundReplay, index} : {roundReplay : RoundReplay, index : number}) => {
    return(
        <div className="flex flex-col">
            <p>Round {index}</p>
            <div className="flex flex-col gap-4">
                {
                    roundReplay.events.map(event => 
                        <EventCard key={event.sequence_number} eventItem={event}/>
                    )
                }
            </div>
        </div>
    )
}

export default RoundCard;