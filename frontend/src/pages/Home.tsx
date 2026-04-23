import React, {useState} from 'react';
import NewPlayerModal from "../components/NewPlayerModal.tsx";

const Home = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [playerName, setPlayerName] = useState("");

    const showModal = (bool: boolean) =>{
        setIsVisible(bool);
    }

    const setName = (name: string) =>{
        setPlayerName(name);
    }

    return (
        <>
            <div className={"flex flex-col justify-center items-center mt-50 gap-4"}>
                <p>{playerName && `Hello ${playerName}`}</p>
                <button className={"p-4 border rounded hover:bg-gray-400/20 hover:cursor-pointer active:bg-gray-400"}>Create Game</button>
            </div>
            <NewPlayerModal setPlayerName={setName} isVisible={isVisible} setIsVisible={showModal}/>
        </>

    );
};

export default Home;