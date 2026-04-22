package com.ordnance.karakal.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;

import java.security.Principal;

@Component
public class WebSocketEventHandler{

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @EventListener
    public void handleConnect(SessionConnectEvent connectEvent){
        Principal user = connectEvent.getUser();
        String playerId = user.getName();
        System.out.println("CONNECT PRINCIPAL: " + playerId);
        messagingTemplate.convertAndSendToUser(playerId, "/user/queue", playerId);
    }
}
