package com.ordnance.karakal.game;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.UUID;

public class GameState {
    public String gameId;
    public int deckSize;
    public int discardSize;
    public UUID currentPlayer;
    public UUID karakalPlayer;
    public Map<UUID, String> players;
    public TreeMap<UUID, Integer> leaderboard;
    public DiscardActionSnap lastPlay;
    public boolean finalRound;
    public boolean roundOver;
    public boolean inProgress;
    public boolean gameOver;
    public UUID host;

    public String toString(){
        StringBuilder builder = new StringBuilder();
        for (UUID id : players.keySet()){
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
