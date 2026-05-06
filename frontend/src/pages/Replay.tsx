import React, {useContext} from 'react';
import GameCard from "../components/GameCard.tsx";
const Replay = () => {
    const context = useContext(ReplayContext);
    if (!context) throw Error("outside of provider!");
    const {games} = context;
    return (
            <div className={"flex flex-col w-screen h-screen justify-center items-center"}>
                {games && games.map(game =>
                    <GameCard gameId={game.game.gameId} date={game.game.createdAt} leaderboard={game.leaderboard}/>
                )}
            </div>
    );
};

import {ReplayContextProvider} from "../utilities/context/ReplayContextProvider.tsx";
import {ReplayContext} from "../utilities/context/ReplayContext.tsx";

export default Replay;