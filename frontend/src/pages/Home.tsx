import React, {useContext, useEffect, useState} from 'react';
import NewPlayerModal from "../components/NewPlayerModal.tsx";
import Join from "../assets/Join.gif"
import JoinHover from "../assets/JoinBlue.gif"
import GifButton from "../components/GifButton.tsx"
import YourRecord from "../assets/YourRecord.gif"
import YourRecordHover from "../assets/YourRecordGreen.gif"
import Host from "../assets/Host2.gif"
import HostHover from "../assets/Host2Orange.gif"
import Karakal from "../assets/Karakal2.gif"
import {Link, useNavigate} from "react-router";
import {GameStateContext} from "../utilities/websocket/GameStateContext.tsx";

const Home = () => {
    const context = useContext(GameStateContext);
    if (!context){
        throw Error("outside of provider!");
    }
    const navigate = useNavigate();
    const {playerName} = context;

    const navigateToJoin= () => {
        navigate("/join")
    }

    const navigateToCreate = () => {
        navigate("/create")
    }

    const navigateToReplay = () => {
        navigate("/replay")
    }

    useEffect(()=>{
        if (!playerName){
            navigate("/")
        }
    },[navigate, playerName])


    return (
        <>
                <div className={"flex flex-col h-screen w-screen items-center justify-center gap-2 font-[Gloria]"}>
                    <img className={"h-80 w-4/5 object-contain"} src={Karakal} alt="Karakal"/>
                    <p className={"text-5xl mb-5"}>Hello {playerName}</p>
                    <div className={"flex flex-col w-full gap-3 items-center"}>
                            <GifButton nonHover={Join} hover={JoinHover} click={navigateToJoin} type={"button"}/>
                            <GifButton nonHover={Host} hover={HostHover} click={navigateToCreate} type={"button"} />
                            <GifButton nonHover={YourRecord} hover={YourRecordHover} type={"button"} click={navigateToReplay}/>
                    </div>
                </div>
        </>
    );
};

export default Home;