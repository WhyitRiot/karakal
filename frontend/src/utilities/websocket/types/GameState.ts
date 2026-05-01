import type {Card} from "../../types/card.ts";

export type GameState = {
    gameId : string
    deckSize : number,
    discardSize : number,
    currentPlayer : string | undefined,
    karakalPlayer : string | undefined,
    players : {[id: string]: string}
    leaderboard : {[id: string]: number}
    lastPlay : {
        playerId : string,
        cards : Card[]
    }
    inProgress : boolean,
    host: string
    gameOver : boolean,
    finalRound : boolean,
    roundOver : boolean
}

// public String gameId;
// public int deckSize;
// public int discardSize;
// public UUID currentPlayer;
// public UUID karakalPlayer;
// public Map<UUID, String> players;
// public TreeMap<UUID, Integer> leaderboard;
// public DiscardActionSnap lastPlay;
// public boolean finalRound;
// public boolean inProgress;
// public boolean gameOver;
// public UUID host;