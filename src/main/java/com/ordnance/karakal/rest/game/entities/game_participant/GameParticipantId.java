package com.ordnance.karakal.rest.game.entities.game_participant;

import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Embeddable
public class GameParticipantId implements Serializable {
    private UUID gameId;
    private UUID userId;

    public GameParticipantId(UUID gameId, UUID userId) {
        this.gameId = gameId;
        this.userId = userId;
    }

    public GameParticipantId() {
    }

    @Override
    public int hashCode() {
        return Objects.hash(gameId, userId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GameParticipantId that = (GameParticipantId) o;
        return Objects.equals(gameId, that.gameId) &&
                Objects.equals(userId, that.userId);
    }
}
