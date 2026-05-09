import {useState, useEffect} from "react"
import {type GameReplay} from "../utilities/context/types/GameReplay"
import RoundCard from "./RoundCard.tsx";

const GameReplayModal = ({gameReplay, visible} : {gameReplay : GameReplay, visible : boolean}) => {
    const [isExiting, setIsExiting] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(visible);


    return(
        <div className={`fixed inset-0 ${isVisible ? `z-50` : `-z-1`} flex h-screen w-screen justify-center items-center font-[Gloria] ${isVisible && `backdrop-blur-md`}`}>
            <div className="absolute flex flex-col justify-center items-center w-4/5 h-4/5">
                <div className={`flex flex-col items-center w-full h-full justify-center border bg-white rounded-4xl shadow-lg ${isVisible ? (isExiting ? `animate-fade-out` : `animate-fade-in`) : `translate-y-full opacity-0`}`}
                onAnimationEnd={() => {
                    if (isExiting) setIsVisible(false);
                }}>
                    <p>Winner: {gameReplay.game.winner}</p>
                    <p>Leaderboard: </p>
                    <div className="border-b-2">
                        <table>
                            <tbody>
                                {gameReplay.results.map(score => 
                                        <tr key={score.playerId}>
                                            <td>
                                                {score.username}
                                            </td>
                                            <td>
                                                {score.score}
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table> 
                    </div>
                    {gameReplay.roundReplays.map((round, index) => <RoundCard roundReplay={round} index={index + 1}/>)}
                </div>
            </div>
        </div>
    )
}

export default GameReplayModal;