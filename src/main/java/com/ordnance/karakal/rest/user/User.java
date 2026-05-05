package com.ordnance.karakal.rest.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "\"user\"")
public class User {
    @Id
    @Column(name = "player_id")
    private UUID playerId;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private Instant lastLogin;

    public User(UUID playerId, String username){
        this.playerId = playerId;
        this.username = username;
        this.lastLogin = Instant.now();
    }

    public UUID getPlayerId() {
        return playerId;
    }

    public void setPlayerId(UUID playerId) {
        this.playerId = playerId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Instant getLastLogin() {
        return lastLogin;
    }


    public User(){

    }
}
