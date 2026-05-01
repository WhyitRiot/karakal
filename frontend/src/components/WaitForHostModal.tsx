import React, {useContext, useState} from 'react';
import {GameStateContext} from "../utilities/websocket/GameStateContext.tsx";


const StartGameModal = ({isVisible, setIsVisible} : {isVisible: boolean, setIsVisible : (bool : boolean) => void}) => {
    const context = useContext(GameStateContext);
    if (!context) throw Error ("outside of provider!")

    const {startGame} = context;

    const [isExiting, setIsExiting] = useState(false);

    const handleClose = () => {
        startGame();
        setIsExiting(true);
    }

    return (
        <div className={`fixed inset-0 ${isVisible ? `z-50` : `-z-1`} flex h-screen justify-center items-center ${isVisible && 'backdrop-blur-md'}`}>
            <div className={"absolute flex flex-col w-1/2 h-2/3"}>
                <div
                      className={`flex flex-col items-center w-full h-full justify-around bg-gray-400 border rounded-4xl ${isVisible ? (isExiting ? 'animate-fade-out' : 'animate-fade-in') : 'translate-y-full opacity-0'}`}
                      onAnimationEnd={() => {
                          if (isExiting) setIsVisible(false);
                      }}
                >
                    <label className={"text-5xl"} htmlFor={"nameInput"}>Start Game?</label>
                    <button onClick={handleClose} className={"text-5xl border rounded-2xl w-1/3 p-4 hover:bg-green-400 hover:cursor-pointer"} type={"submit"}>Go!</button>
                </div>
            </div>
        </div>
    );
};

export default StartGameModal;