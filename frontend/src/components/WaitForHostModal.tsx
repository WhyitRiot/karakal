import React, {useEffect, useState} from 'react';
import WaitForHost from "../assets/WaitingForHost.gif"

const StartGameModal = ({waiting} : {waiting: boolean}) => {

    const [isExiting, setIsExiting] = useState(false);
    const [isVisible, setIsVisible] = useState(!waiting);

    useEffect(()=>{
        if (waiting){
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsExiting(true);
        }
    }, [waiting])

    return (
        <div className={`fixed inset-0 ${isVisible ? `z-50` : `-z-1`} flex h-screen justify-center items-center font-[Gloria] ${isVisible && 'backdrop-blur-md'}`}>
            <div className={"absolute flex flex-col w-1/2 h-2/3"}>
                <div
                      className={`flex flex-col items-center w-full h-full justify-around border bg-white rounded-4xl shadow-lg ${isVisible ? (isExiting ? 'animate-fade-out' : 'animate-fade-in') : 'translate-y-full opacity-0'}`}
                      onAnimationEnd={() => {
                          if (isExiting) setIsVisible(false);
                      }}
                >
                    <img className={"pl-2 pr-2"} src={WaitForHost} alt="Waiting for host..."/>
                </div>
            </div>
        </div>
    );
};

export default StartGameModal;