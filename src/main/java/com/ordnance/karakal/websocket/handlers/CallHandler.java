package com.ordnance.karakal.websocket.handlers;

import com.ordnance.karakal.websocket.GameService;
import com.ordnance.karakal.websocket.messages.CallMessage;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.security.Principal;

@Component
public class CallHandler implements MessageHandler<CallMessage>{
    private GameService gameService;
    private SimpMessagingTemplate simpMessagingTemplate;
    public CallHandler(GameService gameService, SimpMessagingTemplate simpMessagingTemplate){
        this.gameService = gameService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }
    public void handle(CallMessage message, Principal principal){
        this.gameService.callKarakal(message.gameId);
        simpMessagingTemplate.convertAndSend("/game/" + message.gameId.toString(), this.gameService.currentState(message.gameId));
    }
}
