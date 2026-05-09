import React from 'react';
import type {PlayerScore} from "../utilities/context/types/PlayerScore.ts";

type GameCardProps = {
    date : string,
    gameId: string,
    leaderboard : PlayerScore[],
    openModal : (bool : boolean, gameId : string) => void;
}

const GameCard = ({date, gameId, leaderboard, openModal} : GameCardProps) => {
    const jsDate = new Date(date);
    const formattedDate = (`${jsDate.getMonth()}/${jsDate.getDate()}/${jsDate.getFullYear()} ${jsDate.getHours()}:${(jsDate.getMinutes() < 10 ? '0' : '') + jsDate.getMinutes()}`)
    return (
        <div className={"flex flex-col items-center bg-gray-white w-1/2 h-1/2 rounded-2xl drop-shadow-2xl font-[Gloria] shadow-lg hover:cursor-pointer hover:bg-gray-300"}
        onClick={() => openModal(true, gameId)}>
            <div className={"text-5xl m-2 self-start w-full"}>
                <p>{formattedDate}</p>
            </div>
            <div className={"flex flex-row w-full h-full justify-center items-center"}>
                <table className={"text-3xl w-2/3"}>
                    <tbody>
                        {leaderboard && leaderboard.map((item, index) => (
                            <tr key={index} className={"border-b first:text-amber-300"}>
                                <td>{item.username}</td>
                                <td>{item.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p>Game Id:</p>
            <p>{gameId}</p>
        </div>
    );
};

export default GameCard;