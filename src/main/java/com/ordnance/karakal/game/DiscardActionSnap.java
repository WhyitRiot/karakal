package com.ordnance.karakal.game;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class DiscardActionSnap {
    public UUID playerId;
    public List<Card> cards;

    public DiscardActionSnap(UUID playerId){
        this.playerId = playerId;
        this.cards = new ArrayList<>();
    }
}
