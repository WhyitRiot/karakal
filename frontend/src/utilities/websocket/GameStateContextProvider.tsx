import React, {useEffect, useState} from 'react';
import {type GameState} from './types/GameState.ts'
import {type PlayerState} from './types/PlayerState.ts'
import {Client, type IFrame, type IMessage, type StompSubscription} from '@stomp/stompjs'
import {type GameStateContextType} from "./types/GameStateContextType.ts";
import {GameStateContext} from "./GameStateContext.tsx";
import {createCreateMessage} from "./messages/CreateMessage.ts";
import {createJoinMessage} from "./messages/JoinMessage.ts";
import {createStartMessage} from "./messages/StartMessage.ts";
import {type Card, rankMap} from "../card.ts";
import {Rank} from "../rank.ts";
import {Suit} from "../suit.ts";
import {doesNewCardContinueSuitedStraight} from "../cardBools.ts";
import {createDrawMessage, type DrawMessage} from "./messages/DrawMessage.ts";
import {createDiscardMessage} from "./messages/DiscardMessage.ts";
import {createCallMessage} from "./messages/CallMessage.ts";
import game from "../../pages/Game.tsx";
import join from "../../pages/Join.tsx";
import {createPlayMessage, type PlayMessage} from "./messages/PlayMessage.ts";

export const GameStateProvider = ({children} : {children: React.ReactNode}) => {

    //DEV
    const hand : Card[] = [
        {id: 1, rank: Rank.Joker, suit: undefined, state: "hand" },
        {id: 4,  rank: Rank.Ten, suit: Suit.Spades, state: "hand" },
        {id: 7, rank: Rank.Eight, suit: Suit.Spades, state: "hand" },
        {id: 8, rank: Rank.Queen, suit: Suit.Spades, state: "hand" },
        {id: 14, rank: Rank.Joker, suit: undefined, state: "hand" },
        {id: 15, rank: Rank.Nine, suit: Suit.Spades, state: "hand" },
        {id: 43, rank: Rank.Eight, suit: Suit.Diamonds, state: "hand" },
        {id: 66, rank: Rank.Ace, suit: Suit.Diamonds, state: "deck"},
        {id: 55, rank: Rank.Ace, suit: Suit.Hearts, state: "discard"}
    ];

    //Multiplayer State
    const [playerName, setPlayerName] = useState<string | undefined>(undefined);
    const [playerId, setPlayerId] = useState<string | undefined>(undefined);
    const [gameId, setGameId] = useState<string | undefined>(undefined);
    const [gameState, setGameState] = useState<GameState | undefined>(undefined);
    const [playerState, setPlayerState] = useState<PlayerState | undefined>(undefined);
    const [client, setClient] = useState<Client>(new Client());
    const [connected, setConnected] = useState(false);

    //Client-side state

    const [tableCards, setTableCards] = useState<Card[]>([]);

    const mapTableCards = () : void => {
        if (!playerState || !gameState) return;
        setTableCards(prev => {
            const map = new Map(prev.map(card => [card.id, card]));
            const nextIds = new Set<number>();
            //Player Hand
            for (const card of playerState.hand){
                const existing = map.get(card.id);

                map.set(card.id, {
                    ...existing,
                    ...card,
                    rank: rankMap[card.rank],
                    state: existing?.state === "drawing" ? existing.state : "hand"
                })
                nextIds.add(card.id);
            }
            //Discard
            for (const card of gameState.lastPlay.cards){
                const existing = map.get(card.id);
                map.set(card.id, {
                    ...existing,
                    ...card,
                    rank: rankMap[card.rank],
                    state: "discard"
                })
                nextIds.add(card.id);
            }
            for (const id of map.keys()){
                if (!nextIds.has(id)){
                    map.delete(id);
                }
            }
            return Array.from(map.values());
        })
    }

    const spawnCardInDeck = (card : Card) => {
        setTableCards(prev => [
            ...prev,
            {
                id: card.id,
                rank: rankMap[card.id],
                suit: card.suit,
                state: "deck"
            }
        ])
    }

    useEffect(() => {
        if (gameState && playerState){
            // eslint-disable-next-line react-hooks/set-state-in-effect
            mapTableCards()
        }
    }, [gameState, playerState])


    const URL = "ws://localhost:8080/karakal";
    const gameCreatedUrl = "/user/queue/karakal-created";
    const newPlayer = "/user/queue/new-player";
    const playerStateEndPoint = "/user/queue/player-state";
    const drawEndPoint = "/user/queue/draw";
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
                    console.log("Game Created:", msg.body)
                    setGameId(JSON.parse(msg.body));
                });
                client.subscribe(newPlayer, (msg : IMessage) => {
                    console.log("New Player:", msg.body);
                    setPlayerId(JSON.parse(msg.body));
                })
                client.subscribe(playerStateEndPoint, (msg: IMessage) => {
                    console.log("Player state:", msg.body)
                    setPlayerState(JSON.parse(msg.body));
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
            console.log("Setting state:", msg.body);
            setGameState(JSON.parse(msg.body));
        })
        const drawSub : StompSubscription = client.subscribe(drawEndPoint, (msg : IMessage) => {
            console.log("Draw card:", msg.body);
            spawnCardInDeck(JSON.parse(msg.body));
        })
        return () => {sub.unsubscribe(); drawSub.unsubscribe()}
    }, [client, gameId])

    const createGame = () => {
        const createMessage = createCreateMessage();
        client.publish({
            destination: endPoint,
            body: JSON.stringify(createMessage)
        })
    }

    const joinGame = (gameId : string, playerName : string) => {
        if (!gameId) return;
        const joinMessage = createJoinMessage(gameId, playerName);
        console.log(joinMessage);
        client.publish({
            destination: endPoint,
            body: JSON.stringify(joinMessage)
        })
    }

    const startGame = () => {
        if (!gameId) return;
        const startMessage = createStartMessage(gameId);
        client.publish({
            destination: endPoint,
            body: JSON.stringify(startMessage)
        })
    }

    const drawAction = (type : string, cardId? : number)=> {
        if (!gameId || !playerId) return;
        let drawMessage;
        switch (type){
            case "DECK":
                drawMessage = createDrawMessage(gameId, "DECK", playerId); break;
            case "DISCARD" : drawMessage = createDrawMessage(gameId, "DISCARD", playerId, cardId); break;
        }
        console.log(drawMessage);
        client.publish({
            destination: endPoint,
            body: JSON.stringify(drawMessage)
        })
    }

    const discardAction = (cardIds:number[])=>{
        if (!gameId || !playerId) return;
        const discardMessage = createDiscardMessage(gameId, playerId, cardIds);
        client.publish({
            destination: endPoint,
            body: JSON.stringify(discardMessage)
        })
    }

    const playAction = (cardIds : number[], drawType: string, cardId? : number) => {
        if (!gameId || !playerId) return;
        let playMessage;
        switch(drawType){
            case "DECK": playMessage = createPlayMessage(gameId, playerId, drawType, cardIds); break;
            case "DISCARD" : playMessage = createPlayMessage(gameId, playerId, drawType, cardIds, cardId)
        }
        console.log(playMessage);
        client.publish({
            destination: endPoint,
            body: JSON.stringify(playMessage)
        })
    }

    const callAction = () =>{
        if (!gameId || !playerId) return;
        const callMessage = createCallMessage(gameId, playerId);
        client.publish({
            destination: endPoint,
            body: JSON.stringify(callMessage)
        })
    }

    return (
        <GameStateContext.Provider value={{
            playerName, playerId, gameId, gameState, playerState, client, connected, tableCards,
            drawAction, discardAction, callAction, playAction, setTableCards, setName, createGame, joinGame, startGame
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
