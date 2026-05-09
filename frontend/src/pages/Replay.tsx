import React, {useContext, useState} from 'react';
import GameCard from "../components/GameCard.tsx";
import {ReplayContext} from "../utilities/context/ReplayContext.tsx";
import GameReplayModal from '../components/GameReplayModal.tsx';

const Replay = () => {
    const context = useContext(ReplayContext);
    if (!context) throw Error("outside of provider!");
    const {games, replay, fetchGameReplay} = context;
    const [isVisible , setIsVisible] = useState<boolean>(false);
    const openModal = (bool : boolean, gameId: string) => {
        fetchGameReplay(gameId);
        setIsVisible(bool);
    }
    return (
        <>
            <div className={"flex flex-col w-screen h-screen justify-center items-center"}>
                <div className={"mt-5 text-5xl h-1/5 font-[Gloria]"}>
                    Passed Games
                </div>
                <div className={"flex flex-col w-full h-4/5 items-center gap-5"}>
                    {games && games.map(game =>
                        <GameCard gameId={game.game.gameId} date={game.game.createdAt} leaderboard={game.leaderboard} openModal={openModal}/>
                    )}
                </div>
            </div>
            {replay && <GameReplayModal gameReplay={replay} visible={isVisible}/>}
        </>

    );
};

export default Replay;