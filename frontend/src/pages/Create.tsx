import React, {useContext, useEffect} from 'react';
import Join from "../assets/Join.gif";
import JoinHover from "../assets/JoinBlue.gif"
import GifButton from "../components/GifButton.tsx"
import {GameStateContext} from "../utilities/websocket/GameStateContext.tsx";
import {useNavigate} from "react-router";

const Create = () => {
    const context = useContext(GameStateContext);
    if (!context){
        throw Error("outside of provider!");
    }
    const {gameId, playerName, createGame, joinGame} = context;
    const navigate = useNavigate();
    useEffect(()=>{
        if (!gameId) {
            createGame();
        }
    }, [gameId, createGame, joinGame])

    const handleJoin = () => {
        if (!gameId || !playerName) return;
        joinGame(gameId, playerName);
        navigate("/game")
    }
    return (
        <>
            <div className={"flex h-screen w-screen justify-center items-center"}>
                {gameId ?
                    <div className={"flex flex-col h-1/3 w-full justify-center items-center gap-3"}>
                        <div className={"flex flex-col w-2/3 items-center mb-5 gap-3"}>
                            <p className={"text-5xl font-[Gloria]"}>Game ID</p>
                            <p className={"text-2xl text-amber-500"}>{gameId}
                            </p>
                            <p className={"text-2xl font-[Gloria]"}>Share with your friends!</p>
                        </div>
                        <GifButton nonHover={Join} hover={JoinHover} type={"button"} click={handleJoin} />
                    </div>

                    :

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
                    </div>
                }
            </div>
        </>
    );
};

export default Create;