import React, {useContext, useEffect, useState} from 'react';
import {GameStateContext} from "../utilities/websocket/GameStateContext.tsx";
import {useNavigate} from "react-router";

const GameOverModal = ({gameOver} : {gameOver: boolean}) => {
    const context = useContext(GameStateContext);
    if (!context) throw Error("outside of provider!");
    const navigate = useNavigate();
    const {leaderboard, isHost, nextRoundAction} = context;
    const [isExiting, setIsExiting] = useState(false);
    const [isVisible, setIsVisible] = useState(gameOver);

    useEffect(()=>{
        if (!gameOver){
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsExiting(true);
        }
    }, [gameOver])

    const handleExit = () => {
        setIsExiting(true);
        navigate("/");
    }

    return (
        <div className={`fixed inset-0 ${isVisible ? `z-50` : `-z-1`} flex h-screen justify-center items-center ${isVisible && 'backdrop-blur-md'}`}>
            <div className={"absolute flex flex-col items-center justify-center w-1/2 h-2/3"}>
                <div
                      className={`flex flex-col items-center w-full h-full justify-evenly bg-gray-400 rounded-4xl ${isVisible ? (isExiting ? 'animate-fade-out' : 'animate-fade-in') : 'translate-y-full opacity-0'}`}
                      onAnimationEnd={() => {
                          if (isExiting) setIsVisible(false);
                      }}
                >
                    <p className={"text-5xl self-center"}>Game Over!</p>
                    <p className={"text-5xl self-center text-amber-300"}>{leaderboard && `${leaderboard[0].name} is the winner!`}</p>
                    <div className={"flex flex-col gap-5 w-2/3"}>
                        <p className={"text-4xl self-center"}>Scores</p>
                        <table className={"text-3xl w-full"}>
                            <tbody>
                            {leaderboard && leaderboard.map((item, index) => (
                                <tr key={index} className={"border-b"}>
                                    <td>{item.name}</td>
                                    <td>{item.score}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <button onClick={handleExit} className={"text-3xl border rounded p-2 hover:bg-green-400 hover:cursor-pointer"}>Return to Main Menu</button>
                </div>
            </div>
        </div>
    );
};

export default GameOverModal;