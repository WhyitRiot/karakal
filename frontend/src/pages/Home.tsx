import React, {useState} from 'react';
import NewPlayerModal from "../components/NewPlayerModal.tsx";
import {Link} from "react-router";

const Home = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [playerName, setPlayerName] = useState<string | undefined>(undefined);

    const showModal = (bool: boolean) =>{
        setIsVisible(bool);
    }

    const setName = (name: string) =>{
        setPlayerName(name);
    }

    return (
        <>
            {!playerName ? <div className={"flex flex-col justify-center items-center mt-50 gap-4"}>
                <p>{playerName && `Hello ${playerName}`}</p>
                <button className={"p-4 border rounded hover:bg-gray-400/20 hover:cursor-pointer active:bg-gray-400"}>Create Game</button>
            </div> :

                <div className={"flex flex-col h-screen w-screen items-center justify-center gap-2"}>
                    <p className={"text-5xl mb-5"}>Hello {playerName}</p>
                    <div className={"flex flex-col w-1/8 gap-3"}>
                        <Link className={" w-full border rounded hover:cursor-pointer text-3xl text-center hover:bg-blue-400/50"} to={"/join"}>Join Game</Link>
                        <Link className={" w-full border rounded hover:cursor-pointer text-3xl text-center hover:bg-amber-700/50"} to={"/create"}>Create Game</Link>
                    </div>
                </div>
            }

            <NewPlayerModal setPlayerName={setName} isVisible={isVisible} setIsVisible={showModal}/>
        </>
    );
};

export default Home;