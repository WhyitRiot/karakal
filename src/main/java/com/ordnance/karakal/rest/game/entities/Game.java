package com.ordnance.karakal.rest.game.entities;

import com.ordnance.karakal.rest.user.User;
import jakarta.persistence.*;

import java.time.Instant;
import java.util.UUID;

@Entity
public class Game {
    @Id
    private UUID gameId;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    @Column(length = 20)
    private String status = "IN_PROGRESS";

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "winner_id")
    private User winner;

    public Game(UUID gameId, String status, User winner) {
        this.gameId = gameId;
        this.status = status;
        this.winner = winner;
    }

    public Game() {
    }

    public UUID getGameId() {
        return gameId;
    }

    public void setGameId(UUID gameId) {
        this.gameId = gameId;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getWinner() {
        return winner;
    }

    public void setWinner(User winner) {
        this.winner = winner;
    }
}
