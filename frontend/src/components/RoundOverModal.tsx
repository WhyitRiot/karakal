import React, {useContext, useEffect, useState} from 'react';
import {GameStateContext} from "../utilities/websocket/GameStateContext.tsx";

const RoundOverModal = ({roundOver} : {roundOver: boolean}) => {
    const context = useContext(GameStateContext);
    if (!context) throw Error("outside of provider!");
    const {leaderboard, isHost, nextRoundAction} = context;
    const [isExiting, setIsExiting] = useState(false);
    const [isVisible, setIsVisible] = useState(roundOver);

    useEffect(()=>{
        if (!roundOver){
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsExiting(true);
        }
    }, [roundOver])

    return (
        <div className={`fixed inset-0 ${isVisible ? `z-50` : `-z-1`} flex h-screen justify-center font-[Gloria] items-center ${isVisible && 'backdrop-blur-md'}`}>
            <div className={"absolute flex flex-col items-center justify-center w-1/2 h-2/3"}>
                <div
                      className={`flex flex-col items-center align-middle w-full h-full justify-evenly bg-white shadow-lg rounded-4xl ${isVisible ? (isExiting ? 'animate-fade-out' : 'animate-fade-in') : 'translate-y-full opacity-0'}`}
                      onAnimationEnd={() => {
                          if (isExiting) setIsVisible(false);
                      }}
                >
                    <p className={"text-5xl self-center"}>Round Over!</p>
                    <div className={"flex flex-col gap-5 w-2/3"}>
                        <p className={"text-4xl self-center"}>Scores</p>
                        <table className={"text-3xl w-full"}>
                            {leaderboard && leaderboard.map((item, index) => (
                                <tr key={index} className={"border-b first:text-amber-300"}>
                                    <td>{item.name}</td>
                                    <td>{item.score}</td>
                                </tr>
                            ))}
                        </table>
                    </div>{ isHost ?
                    <button onClick={nextRoundAction} className={"text-3xl border rounded p-2 hover:bg-green-400 hover:cursor-pointer"}>Start next round!</button>
                    :
                    <div className={"flex flex-row justify-center w-2/3"}>
                        <p className={"text-3xl text-center"}>Waiting for host to start the next round...</p>
                    </div>
                }
                </div>
            </div>
        </div>
    );
};

export default RoundOverModal;