import React, {useContext, useEffect, useState} from 'react';
import {GameStateContext} from "../utilities/websocket/GameStateContext.tsx";


const WiatForYourTurnModal = ({waiting, player} : {waiting: boolean, player : string | undefined}) => {
    const [isExiting, setIsExiting] = useState(false);
    const [isVisible, setIsVisible] = useState(!waiting);

    useEffect(()=>{
        if (waiting){
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsExiting(true);
        }
    }, [waiting])

    return (
        <div className={`fixed inset-0 ${isVisible ? `z-50` : `-z-1`} flex h-screen justify-center items-center}`}>
            <div className={"absolute flex flex-col w-1/2 h-2/3"}>
                <div
                      className={`flex flex-col items-center w-full h-full justify-around ${isVisible ? (isExiting ? 'animate-fade-out' : 'animate-fade-in') : 'translate-y-full opacity-0'}`}
                      onAnimationEnd={() => {
                          if (isExiting) setIsVisible(false);
                      }}
                >
                    <p className={"text-5xl"}>{`${player}'s turn...`}</p>
                </div>
            </div>
        </div>
    );
};

export default WiatForYourTurnModal;