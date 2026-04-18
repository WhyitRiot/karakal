package com.ordnance.karakal.game;

import java.util.List;
import java.util.UUID;

public class DiscardAction {
    private UUID playerId;
    List<Long> cardIds;

    public DiscardAction(UUID playerId, List<Long> cardIds) {
        this.playerId = playerId;
        this.cardIds = cardIds;
    }
}
