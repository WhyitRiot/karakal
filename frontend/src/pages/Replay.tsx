import React, {useContext} from 'react';
import GameCard from "../components/GameCard.tsx";
import {ReplayContext} from "../utilities/context/ReplayContext.tsx";

const Replay = () => {
    const context = useContext(ReplayContext);
    if (!context) throw Error("outside of provider!");
    const {games} = context;
    return (
            <div className={"flex flex-col w-screen h-screen justify-center items-center"}>
                <div className={"mt-5 text-5xl h-1/5 font-[Gloria]"}>
                    Passed Games
                </div>
                <div className={"flex flex-col w-full h-4/5 items-center gap-5"}>
                    {games && games.map(game =>
                        <GameCard gameId={game.game.gameId} date={game.game.createdAt} leaderboard={game.leaderboard}/>
                    )}
                </div>
            </div>
    );
};

export default Replay;