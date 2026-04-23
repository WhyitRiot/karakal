package com.ordnance.karakal.websocket.messages;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;


@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        property = "type"
)
@JsonSubTypes(
        {
                @JsonSubTypes.Type(value = CreateMessage.class, name = "CREATE"),
                @JsonSubTypes.Type(value = JoinMessage.class, name = "JOIN"),
                @JsonSubTypes.Type(value = DiscardMessage.class, name = "DISCARD"),
                @JsonSubTypes.Type(value = DrawMessage.class, name = "DRAW"),
                @JsonSubTypes.Type(value = CallMessage.class, name = "CALL"),
                @JsonSubTypes.Type(value = StartMessage.class, name = "START")
        }
)

public interface ClientMessage {
}
