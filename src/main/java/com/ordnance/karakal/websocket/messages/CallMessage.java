package com.ordnance.karakal.websocket.messages;

import java.util.UUID;

public class CallMessage implements ClientMessage{
    public UUID gameId;
    public UUID playerId;
}
