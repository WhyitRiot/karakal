import type {Card} from "../../card.ts";

export type GameState = {
    gameId : string
    deckSize : number,
    discardSize : number,
    currentPlayer : string | undefined,
    players : string[] | undefined,
    leaderboard : Map<string, number>
    lastPlay : {
        playerId : string,
        cards : Card[]
    }
    inProgress : boolean
}

// public String gameId;
// public int deckSize;
// public int discardSize;
// public UUID currentPlayer;
// public List<UUID> players;
// public TreeMap<UUID, Integer> leaderboard;
// public DiscardAction lastPlay;
// public boolean inProgress;