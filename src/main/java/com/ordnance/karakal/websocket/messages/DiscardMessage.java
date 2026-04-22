package com.ordnance.karakal.websocket.messages;

import java.util.List;
import java.util.UUID;

public class DiscardMessage implements ClientMessage{
    public UUID gameId;
    public UUID playerId;
    public List<Long> cardIds;
}
