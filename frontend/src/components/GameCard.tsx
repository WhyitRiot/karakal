import React from 'react';

type GameCardProps = {
    date : string,
    gameId: string,
    leaderboard : {name: string, score: number | string}[]| undefined
}

const GameCard = ({date, gameId, leaderboard} : GameCardProps) => {
    return (
        <div className={"flex flex-col items-center bg-gray-white w-1/2 h-1/2 rounded-2xl drop-shadow-2xl font-[Gloria] shadow-lg"}>
            <div className={"text-5xl m-2 self-start w-full"}>
                <p>{date}</p>
                <p>{gameId}</p>
            </div>
            <div className={"flex flex-row w-full h-full justify-center items-center"}>
                <table className={"text-3xl w-2/3"}>
                    <tbody>
                        {leaderboard && leaderboard.map((item, index) => (
                            <tr key={index} className={"border-b first:text-amber-300"}>
                                <td>{item.name}</td>
                                <td>{item.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GameCard;