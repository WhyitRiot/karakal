import React from 'react';

const Card = ({suit, rank} : {suit: string, rank : string}) => {
    return (
        <div className={"flex flex-col border rounded items-center"}>
            <p>{suit}</p>
            <p>{rank}</p>
        </div>
    );
};

export default Card;