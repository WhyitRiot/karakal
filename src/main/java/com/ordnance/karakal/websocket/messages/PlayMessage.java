package com.ordnance.karakal.websocket.messages;

import java.util.List;
import java.util.UUID;

public class PlayMessage implements ClientMessage{
    public UUID gameId;
    public UUID playerId;

    public DRAW drawType;
    public Long drawCardId;

    public List<Long> discardIds;
}
