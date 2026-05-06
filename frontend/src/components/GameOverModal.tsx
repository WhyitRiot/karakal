import React, {useContext, useEffect, useState} from 'react';
import {GameStateContext} from "../utilities/websocket/GameStateContext.tsx";
import GameOver from "../assets/GameOver.gif"
import Back from "../assets/Back.gif"
import BackHover from "../assets/BackOrange.gif"
import GifButton from "../components/GifButton.tsx"
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
        sessionStorage.removeItem("gameId");
        navigate("/home");
    }

    return (
        <div className={`fixed inset-0 ${isVisible ? `z-50` : `-z-1`} flex h-screen justify-center items-center ${isVisible && 'backdrop-blur-md'}`}>
            <div className={"absolute flex flex-col items-center justify-center w-1/2 h-2/3"}>
                <div
                      className={`flex flex-col items-center w-full h-full justify-evenly bg-white shadow-lg drop-shadow-lg rounded-4xl ${isVisible ? (isExiting ? 'animate-fade-out' : 'animate-fade-in') : 'translate-y-full opacity-0'}`}
                      onAnimationEnd={() => {
                          if (isExiting) setIsVisible(false);
                      }}
                >
                    {/*<p className={"text-5xl self-center"}>Game Over!</p>*/}
                    <img src={GameOver} alt="Game Over!"/>
                    <p className={"text-5xl self-center text-amber-300 font-[Gloria]"}>{leaderboard && `${leaderboard[0].name} is the winner!`}</p>
                    <div className={"flex flex-col gap-5 w-2/3 font-[Gloria]"}>
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
                    <GifButton nonHover={Back} hover={BackHover} type={"button"} click={handleExit} />
                </div>
            </div>
        </div>
    );
};

export default GameOverModal;