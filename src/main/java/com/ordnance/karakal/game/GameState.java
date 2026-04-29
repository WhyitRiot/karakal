package com.ordnance.karakal.game;

import java.util.List;
import java.util.TreeMap;
import java.util.UUID;

public class GameState {
    public String gameId;
    public int deckSize;
    public int discardSize;
    public UUID currentPlayer;
    public List<UUID> players;
    public TreeMap<UUID, Integer> leaderboard;
    public DiscardActionSnap lastPlay;
    public boolean inProgress;

    public String toString(){
        StringBuilder builder = new StringBuilder();
        for (UUID id : players){
            builder.append(id);
            builder.append(", ");
        }
        return "Game ID: "+ gameId + "\n" +
                "Deck Size: " + deckSize + "\n" +
                "Discard Size: " + discardSize + "\n" +
                "Current Player: " + currentPlayer + "\n" +
                "Players: " + builder.toString();
    }
}
