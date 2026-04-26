import React, {useContext, useState} from 'react';
import CardItem from "../components/CardItem.tsx";
import {type Card} from "../utilities/card.ts"
import {Rank} from "../utilities/rank.ts";
import {Suit} from "../utilities/suit.ts"
import {GameStateContext} from "../utilities/websocket/GameStateContext.tsx";
import DiscardItem from "../components/DiscardItem.tsx";

const hand = [
    {id: 1, rank: Rank.Joker, suit: undefined },
    {id: 4,  rank: Rank.Ten, suit: Suit.Spades },
    {id: 7, rank: Rank.King, suit: Suit.Diamonds },
    {id: 8, rank: Rank.Queen, suit: Suit.Clubs },
    {id: 14, rank: Rank.Joker, suit: undefined },
    {id: 15, rank: Rank.Nine, suit: Suit.Spades },
    {id: 43, rank: Rank.Eight, suit: Suit.Diamonds }
];

const Game = () => {
    const context = useContext(GameStateContext);
    if (!context) throw Error("outside of provider!");
    const{discardHand} = context;
    return (
        <div className={"flex flex-col h-screen w-screen justify-around"}>

            <div className={"flex flex-row gap-5 justify-center"}>
                <p className={"border rounded"}>Discard</p>
                <p className={"border rounded"}>Deck</p>
            </div>
            <div className={"flex flex-col items-center gap-4"}>
                <div className={"flex flex-row gap-3"}>
                    {hand.map(card => {
                        return <CardItem card={card} key={card.id}/>
                    })}
                </div>
            </div>

        </div>
    );
};

export default Game;