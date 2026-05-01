import type {Card} from "../../card.ts";

export type GameState = {
    gameId : string
    deckSize : number,
    discardSize : number,
    currentPlayer : string | undefined,
    players : {[id: string]: string}
    leaderboard : Map<string, number>
    lastPlay : {
        playerId : string,
        cards : Card[]
    }
    inProgress : boolean,
    host: string
}

// public String gameId;
// public int deckSize;
// public int discardSize;
// public UUID currentPlayer;
// public List<UUID> players;
// public TreeMap<UUID, Integer> leaderboard;
// public DiscardAction lastPlay;
// public boolean inProgress;
// public UUID host;