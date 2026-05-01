package com.ordnance.karakal.websocket;


import com.ordnance.karakal.websocket.handlers.*;
import com.ordnance.karakal.websocket.messages.*;
import org.hibernate.mapping.Join;
import org.hibernate.sql.ast.tree.expression.Star;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
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
            CallHandler callHandler,
            StartHandler startHandler,
            PlayHandler playHandler,
            StartNextRoundHandler nextRoundHandler
    ){
        handlers.put(CreateMessage.class, createhandler);
        handlers.put(JoinMessage.class, joinHandler);
        handlers.put(DiscardMessage.class, discardHandler);
        handlers.put(DrawMessage.class, drawHandler);
        handlers.put(CallMessage.class, callHandler);
        handlers.put(StartMessage.class, startHandler);
        handlers.put(PlayMessage.class, playHandler);
        handlers.put(StartNextRoundMessage.class, nextRoundHandler);
    }
    @SuppressWarnings("unchecked")
    public void dispatch(ClientMessage message, Principal principal){
        MessageHandler handler = handlers.get(message.getClass());
        handler.handle(message, principal);
    }
}
