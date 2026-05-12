import {useState, useEffect, useContext, use} from "react"
import {type GameReplay} from "../utilities/context/types/GameReplay"
import {ReplayContext} from "../utilities/context/ReplayContext.tsx"
import RoundCard from "./RoundCard.tsx";
import type {PlayerScore} from "../utilities/context/types/PlayerScore.ts";

const GameReplayModal = ({visible, gameReplay} : {gameReplay : GameReplay, visible : boolean}) => {
    const context = useContext(ReplayContext)
    if (!context) throw Error("outside of provider!");
    const [isExiting, setIsExiting] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(visible);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(()=>{
        setIsVisible(visible);
        if (gameReplay.results){
            setIsLoading(false);
            console.log(gameReplay);
        }
    },[visible, gameReplay])


    return(
        
        <>
        {
            isLoading ? 
                    <div role="status" className="flex flex-col items-center mt-6">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             className="size-8 animate-[spin_0.8s_linear_infinite] fill-blue-600 dark:fill-blue-500"
                             viewBox="0 0 24 24"
                             aria-hidden="true">
                            <path
                                d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
                                data-original="#000000"/>
                        </svg>
                        <span className="sr-only">Loading…</span>
                    </div> :
            <div onClick={()=>setIsExiting(true)} className={`fixed inset-0 ${isVisible ? `z-50` : `-z-1`} flex h-screen w-screen justify-center items-center font-[Gloria] ${isVisible && `backdrop-blur-md`}`}>
                <div onClick={e => e.stopPropagation()} className="absolute flex flex-col justify-center items-center w-95/100 h-95/100">
                    <div className={`flex flex-col items-center w-full h-full justify-center border bg-white rounded shadow-lg ${isVisible ? (isExiting ? `animate-fade-out` : `animate-fade-in`) : `translate-y-full opacity-0`}`}
                    onAnimationEnd={() => {
                        if (isExiting) setIsVisible(false); setIsExiting(false);
                    }}>
                        <div className="flex flex-col w-90/100 h-90/100 overflow-y-scroll overscroll-contain">
                            <p>{`Winner: ${gameReplay.game.winner.username}`}</p>
                            <p>Leaderboard: </p>
                            <div className="border-b-2">
                                <table>
                                    <tbody>
                                        {gameReplay.results.map((score : PlayerScore) =>
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
                            <div className="flex flex-col gap-3">
                                {gameReplay.roundReplays.map((round, index) => <RoundCard key={index} roundReplay={round} index={index + 1}/>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
}
        </>
    )
}

export default GameReplayModal;