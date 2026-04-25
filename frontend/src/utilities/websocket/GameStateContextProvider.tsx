import React, {createContext, useEffect, useState} from 'react';
import {type GameState} from './types/GameState.ts'
import {type PlayerState} from './types/PlayerState.ts'
import {Client, type IFrame, type IMessage, type StompSubscription} from '@stomp/stompjs'
import {createCreateMessage} from "./messages/CreateMessage.ts";
import {createJoinMessage} from "./messages/JoinMessage.ts";
import {createStartMessage} from "./messages/StartMessage.ts";

export const GameStateProvider = ({children} : {children: React.ReactNode}) => {

    const [playerName, setPlayerName] = useState<string | undefined>(undefined);
    const [playerId, setPlayerId] = useState<string | undefined>(undefined);
    const [gameId, setGameId] = useState<string | undefined>(undefined);
    const [gameState, setGameState] = useState<GameState | undefined>(undefined);
    const [playerState, setPlayerState] = useState<PlayerState | undefined>(undefined);
    const [client, setClient] = useState<Client>(new Client());
    const [connected, setConnected] = useState(false);

    const URL = "ws://localhost:8080/karakal";
    const gameCreatedUrl = "karakal-created";
    const newPlayer = "new-player";
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
            playerName, playerId, gameId, gameState, playerState, client, connected,
            setName, createGame, joinGame, startGame
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
