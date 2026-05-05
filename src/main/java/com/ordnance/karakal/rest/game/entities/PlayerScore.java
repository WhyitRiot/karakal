package com.ordnance.karakal.rest.game.entities;

import java.util.UUID;

public interface PlayerScore {
    UUID getPlayerId();
    String getUsername();
    Integer getTotalScore();
}
