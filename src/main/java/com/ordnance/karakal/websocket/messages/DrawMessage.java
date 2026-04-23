package com.ordnance.karakal.websocket.messages;

import com.ordnance.karakal.websocket.DRAW;

import java.util.List;
import java.util.UUID;

public class DrawMessage implements ClientMessage{
    public UUID gameId;
    public DRAW drawType;
    public UUID playerId;
    public Long cardId;
}
