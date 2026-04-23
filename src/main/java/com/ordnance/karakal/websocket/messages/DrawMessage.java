package com.ordnance.karakal.websocket.messages;

import java.util.UUID;

public class DrawMessage implements ClientMessage{
    public UUID gameId;
    public DRAW drawType;
    public UUID playerId;
    public Long cardId;
}
