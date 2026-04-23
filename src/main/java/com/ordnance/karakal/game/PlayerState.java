package com.ordnance.karakal.game;

import java.util.List;
import java.util.UUID;

public class PlayerState {
    public UUID userId;
    public String name;
    public int score;
    public List<Card> hand;

    public String toString(){
        StringBuilder builder = new StringBuilder();
        for (Card card : hand){
            builder.append(card.toString());
            builder.append(" ");
        }
        return "User ID: " + userId + "\n" +
                "Name: " + name + "\n" +
                "Score: " + score + "\n" +
                builder.toString();
    }
}
