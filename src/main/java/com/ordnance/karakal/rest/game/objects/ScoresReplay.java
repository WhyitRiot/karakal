package com.ordnance.karakal.rest.game.objects;

import java.util.UUID;

public class ScoresReplay {
    private UUID playerId;
    private String username;
    private int score;

    public UUID getPlayerId() {
        return playerId;
    }

    public String getUsername(){
        return username;
    }

    public int getScore() {
        return score;
    }

    public ScoresReplay(UUID playerId, String username, int score) {
        this.playerId = playerId;
        this.username = username;
        this.score = score;
    }
}
