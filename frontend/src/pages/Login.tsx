import React, {useContext, useState} from 'react';
import NewPlayerModal from "../components/NewPlayerModal.tsx";
import LoginGif from "../assets/Login.gif"
import LoginGifHover from "../assets/LoginGreen.gif"
import NewPlayer from "../assets/NewPlayer.gif"
import NewPlayerHover from "../assets/NewPlayerBlue.gif"
import GifButton from "../components/GifButton.tsx"
import Karakal from "../assets/Karakal2.gif"
import {Link, useNavigate} from "react-router";
import {GameStateContext} from "../utilities/websocket/GameStateContext.tsx";
import LoginModal from "../components/LoginModal.tsx";

const Login = () => {
    const context = useContext(GameStateContext);
    if (!context){
        throw Error("outside of provider!");
    }
    const navigate = useNavigate();
    const {playerName, setName} = context;
    const [isNewPlayerVisible, setIsNewPlayerVisible] = useState(false);
    const [isLoginVisible, setIsLoginVisible] = useState(false);

    const showNewPlayerModal = (bool: boolean) =>{
        setIsNewPlayerVisible(bool);
    }

    const showLoginModal = (bool : boolean) => {
        setIsLoginVisible(bool);
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

    const navigateToHome = () => {
        navigate("/")
    }


    return (
        <>
                <div className={"flex flex-col h-screen w-screen items-center justify-center gap-2 font-[Gloria]"}>
                    <img className={"h-80 w-4/5 object-contain"} src={Karakal} alt="Karakal"/>
                    <div className={"flex flex-col w-full gap-3 items-center"}>
                            <GifButton nonHover={LoginGif} hover={LoginGifHover} click={() => showLoginModal(true)} type={"button"}/>
                            <GifButton nonHover={NewPlayer} hover={NewPlayerHover} click={() => showNewPlayerModal(true)} type={"button"} />
                    </div>
                </div>

            <NewPlayerModal setPlayerName={setPlayerName} isVisible={isNewPlayerVisible} setIsVisible={showNewPlayerModal}/>
            <LoginModal setPlayerName={setPlayerName} isVisible={isLoginVisible} setIsVisible={showLoginModal}/>
        </>
    );
};

export default Login;