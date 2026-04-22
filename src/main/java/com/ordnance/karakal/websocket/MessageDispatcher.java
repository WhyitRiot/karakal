package com.ordnance.karakal.websocket;

import com.ordnance.karakal.websocket.handlers.*;
import com.ordnance.karakal.websocket.messages.ClientMessage;
import org.hibernate.mapping.Join;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@Component
public class MessageDispatcher {
    private final Map<Class<?>, MessageHandler<?>> handlers = new HashMap<>();
    public MessageDispatcher(
            CreateHandler createhandler,
            JoinHandler joinHandler,
            DiscardHandler discardHandler,
            DrawHandler drawHandler,
            CallHandler callHandler
    ){
        handlers.put(CreateHandler.class, createhandler);
        handlers.put(JoinHandler.class, joinHandler);
        handlers.put(DiscardHandler.class, discardHandler);
        handlers.put(DrawHandler.class, drawHandler);
        handlers.put(CallHandler.class, callHandler);
    }
    @SuppressWarnings("unchecked")
    public void dispatch(ClientMessage message, Principal principal){
        MessageHandler handler = handlers.get(message.getClass());
        handler.handle(message, principal);
    }
}
