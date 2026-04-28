import React, {useEffect, useState} from 'react';
import {type GameState} from './types/GameState.ts'
import {type PlayerState} from './types/PlayerState.ts'
import {Client, type IFrame, type IMessage, type StompSubscription} from '@stomp/stompjs'
import {type GameStateContextType} from "./types/GameStateContextType.ts";
import {GameStateContext} from "./GameStateContext.tsx";
import {createCreateMessage} from "./messages/CreateMessage.ts";
import {createJoinMessage} from "./messages/JoinMessage.ts";
import {createStartMessage} from "./messages/StartMessage.ts";
import type {Card} from "../card.ts";
import {Rank} from "../rank.ts";
import {Suit} from "../suit.ts";

export const GameStateProvider = ({children} : {children: React.ReactNode}) => {

    //DEV
    const hand : Card[] = [
        {id: 1, rank: Rank.Joker, suit: undefined, state: "hand" },
        {id: 4,  rank: Rank.Ten, suit: Suit.Spades, state: "hand" },
        {id: 7, rank: Rank.King, suit: Suit.Diamonds, state: "hand" },
        {id: 8, rank: Rank.Queen, suit: Suit.Clubs, state: "hand" },
        {id: 14, rank: Rank.Joker, suit: undefined, state: "hand" },
        {id: 15, rank: Rank.Nine, suit: Suit.Spades, state: "hand" },
        {id: 43, rank: Rank.Eight, suit: Suit.Diamonds, state: "hand" },
        {id: 66, rank: Rank.Ace, suit: Suit.Diamonds, state: "deck"}
    ];


    //Multiplayer State
    const [playerName, setPlayerName] = useState<string | undefined>(undefined);
    const [playerId, setPlayerId] = useState<string | undefined>(undefined);
    const [gameId, setGameId] = useState<string | undefined>(undefined);
    const [gameState, setGameState] = useState<GameState | undefined>(undefined);
    const [playerState, setPlayerState] = useState<PlayerState | undefined>(undefined);
    const [client, setClient] = useState<Client>(new Client());
    const [connected, setConnected] = useState(false);

    const discard = () => {
        // TODO add discard server call
        resetDiscardHand()
    }

    //Client-side state
    const [tableCards, setTableCards] = useState<Card[]>(hand);
    const [discardHand, setDiscardHand] = useState<Card[]>([]);

    const resetDiscardHand = () => {
        setDiscardHand([]);
    }

    const addCard = (card : Card) => {
        setDiscardHand(prev => [...prev, card]);
    }

    const removeCard = (card : Card) => {
        setDiscardHand(prev => prev.filter(prevCard => prevCard.id != card.id))
    }

    const URL = "ws://localhost:8080/karakal";
    const gameCreatedUrl = "/user/queue/karakal-created";
    const newPlayer = "/user/queue/new-player";
    const endPoint = "/app/play";
    const gameEndPoint = "/game/"

    const setName = (name : string) =>{
        setPlayerName(name);
    }

    //On first load
    useEffect(() =>{
        const client = new Client({
            brokerURL: URL,
            onConnect: (frame: IFrame) => {
                setConnected(true);
                client.subscribe(gameCreatedUrl, (msg: IMessage) => {
                    console.log(msg.body)
                    setGameId(msg.body);
                });
                client.subscribe(newPlayer, (msg : IMessage) => {
                    setPlayerId(msg.body);
                })
            }
        })

        client.activate();
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setClient(client);

        return () => {client.deactivate()};
    }, [])

    //On game creation
    useEffect(() =>{
        if (!gameId || !client) return;
        const sub : StompSubscription = client.subscribe(`${gameEndPoint}${gameId}`, (msg : IMessage) =>{
            setGameState(JSON.parse(msg.body));
        })
        return () => {sub.unsubscribe()}
    }, [client, gameId])

    const createGame = () => {
        const createMessage = createCreateMessage();
        client.publish({
            destination: endPoint,
            body: JSON.stringify(createMessage)
        })
    }

    const joinGame = (gameId : string, playerName : string) => {
        const joinMessage = createJoinMessage(gameId, playerName);
        client.publish({
            destination: endPoint,
            body: JSON.stringify(joinMessage)
        })
    }

    const startGame = (gameId : string) => {
        const startMessage = createStartMessage(gameId);
        client.publish({
            destination: endPoint,
            body: JSON.stringify(startMessage)
        })
    }

    return (
        <GameStateContext.Provider value={{
            playerName, playerId, gameId, gameState, playerState, client, connected, discardHand, tableCards,
            discard, removeCard, addCard, setName, resetDiscardHand, createGame, joinGame, startGame
        }}>
            {children}
        </GameStateContext.Provider>
    );

    // playerName : string | undefined
    // playerId: string | undefined
    // gameId : string | undefined,
    //     gameState : GameState | undefined,
    //     playerState : PlayerState | undefined,
    //     client : Client,
    //     connected : boolean
};
