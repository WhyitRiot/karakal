package com.ordnance.karakal.rest.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.time.Instant;
import java.util.UUID;

@Entity
public class User {
    @Id
    private UUID playerId;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private Instant lastLogin;

    public User(UUID playerId, String username, Instant lastLogin){
        this.playerId = playerId;
        this.username = username;
        this.lastLogin = lastLogin;
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
