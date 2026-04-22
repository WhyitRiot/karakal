package com.ordnance.karakal.websocket.handlers;

import com.ordnance.karakal.websocket.messages.ClientMessage;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;

import java.security.Principal;


public interface MessageHandler<T> {
    public void handle(T message, Principal principal);
}
