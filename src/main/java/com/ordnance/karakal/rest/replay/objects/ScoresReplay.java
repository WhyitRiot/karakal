package com.ordnance.karakal.rest.replay.objects;

import java.util.UUID;

public class ScoresReplay {
    private UUID playerId;
    private String username;
    private Long score;

    public UUID getPlayerId() {
        return playerId;
    }

    public String getUsername(){
        return username;
    }

    public Long getScore() {
        return score;
    }

    public void setPlayerId(UUID playerId) {
        this.playerId = playerId;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setScore(Long score) {
        this.score = score;
    }

    public ScoresReplay(UUID playerId, String username, Long score) {
        this.playerId = playerId;
        this.username = username;
        this.score = score;
    }
}
