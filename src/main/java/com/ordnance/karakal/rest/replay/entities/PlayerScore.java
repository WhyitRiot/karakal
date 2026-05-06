package com.ordnance.karakal.rest.replay.entities;

import java.util.UUID;

public interface PlayerScore {
    UUID getPlayerId();
    String getUsername();
    Long getTotalScore();
}
