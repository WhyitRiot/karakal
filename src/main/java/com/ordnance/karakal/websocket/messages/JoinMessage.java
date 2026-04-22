package com.ordnance.karakal.websocket.messages;

import java.util.UUID;

public class JoinMessage implements ClientMessage{
    public UUID gameId;
    public String playerName;
}
