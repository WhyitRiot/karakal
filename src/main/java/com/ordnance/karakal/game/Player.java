package com.ordnance.karakal.game;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Player {
    private UUID uuid;
    private String name;
    private int score;
    private List<Long> hand;

    public Player(UUID uuid, String name) {
        this.score = 0;
        this.hand = new ArrayList<>();
        this.uuid = uuid;
        this.name = name;
    }

    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public List<Long> getHand() {
        return hand;
    }

    public void setHand(List<Long> hand) {
        this.hand = hand;
    }
}
