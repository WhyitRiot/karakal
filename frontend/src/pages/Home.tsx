import React, {useContext, useState} from 'react';
import NewPlayerModal from "../components/NewPlayerModal.tsx";
import Join from "../assets/Join.gif"
import JoinHover from "../assets/JoinBlue.gif"
import GifButton from "../components/GifButton.tsx"
import Host from "../assets/Host.gif"
import HostHover from "../assets/HostOrange.gif"
import {Link, useNavigate} from "react-router";
import {GameStateContext} from "../utilities/websocket/GameStateContext.tsx";

const Home = () => {
    const context = useContext(GameStateContext);
    if (!context){
        throw Error("outside of provider!");
    }
    const navigate = useNavigate();
    const {playerName, setName} = context;
    const [isVisible, setIsVisible] = useState((playerName == undefined));

    const showModal = (bool: boolean) =>{
        setIsVisible(bool);
    }

    const setPlayerName = (name: string) =>{
        setName(name);
    }

    const navigateToJoin= () => {
        navigate("/join")
    }

    const navigateToCreate = () => {
        navigate("/create")
    }


    return (
        <>
            {!playerName ? <div className={"flex flex-col justify-center items-center mt-50 gap-4 font-[Gloria]"}>
                <p>{playerName && `Hello ${playerName}`}</p>
                <button className={"p-4 border rounded hover:bg-gray-400/20 hover:cursor-pointer active:bg-gray-400"}>Create Game</button>
            </div> :

                <div className={"flex flex-col h-screen w-screen items-center justify-center gap-2 font-[Gloria]"}>
                    <p className={"text-5xl mb-5"}>Hello {playerName}</p>
                    <div className={"flex flex-col w-full gap-3 items-center"}>
                            <GifButton nonHover={Join} hover={JoinHover} click={navigateToJoin} type={"button"}/>
                            <GifButton nonHover={Host} hover={HostHover} click={navigateToCreate} type={"button"} />
                    </div>
                </div>
            }

            <NewPlayerModal setPlayerName={setPlayerName} isVisible={isVisible} setIsVisible={showModal}/>
        </>
    );
};

export default Home;