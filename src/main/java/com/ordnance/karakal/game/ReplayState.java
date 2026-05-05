package com.ordnance.karakal.game;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public class ReplayState {
    public List<Card> initialDeck;
    public Map<UUID, List<Card>> startingHands;
    public Card initialDiscard;
}
