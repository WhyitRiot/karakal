package com.ordnance.karakal.websocket.handlers;

import com.ordnance.karakal.websocket.GameService;
import com.ordnance.karakal.websocket.messages.StartNextRoundMessage;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.security.Principal;
@Component
public class StartNextRoundHandler implements MessageHandler<StartNextRoundMessage> {
    private GameService gameService;
    private SimpMessagingTemplate simpMessagingTemplate;
    public StartNextRoundHandler(GameService gameService, SimpMessagingTemplate simpMessagingTemplate){
        this.gameService = gameService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }
    @Override
    public void handle(StartNextRoundMessage message, Principal principal) {
        this.gameService.startNextRound(message.gameId);
        this.simpMessagingTemplate.convertAndSend("/game/" + message.gameId, this.gameService.currentState(message.gameId));
    }
}
