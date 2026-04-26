import React, {useContext, useEffect} from 'react';
import {GameStateContext} from "../utilities/websocket/GameStateContext.tsx";

const Create = () => {
    const context = useContext(GameStateContext);
    if (!context){
        throw Error("outside of provider!");
    }
    const {gameId, createGame} = context;
    useEffect(()=>{
        if (!gameId) {
            createGame();
        }
    })
    return (

        <>
            <div className={"flex h-screen w-screen justify-center items-center"}>
                {gameId ?

                    <div className={"flex flex-col h-1/3 w-1/3 justify-center items-center gap-3"}>
                        <p className={"text-5xl"}>Game ID</p>
                        <p className={"text-2xl text-amber-500"}>{gameId}
                        </p>
                        <p className={"text-2xl"}>Share with your friends!</p>
                        <button className={"text-5xl w-2/3 border rounded hover:bg-blue-400/50 hover:cursor-pointer"}>Join
                        </button>
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