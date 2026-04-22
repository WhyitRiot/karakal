package com.ordnance.karakal.websocket.handlers;

import com.ordnance.karakal.websocket.messages.ClientMessage;

import java.security.Principal;


public interface MessageHandler<T> {
    public void handle(T message, Principal principal);
}
