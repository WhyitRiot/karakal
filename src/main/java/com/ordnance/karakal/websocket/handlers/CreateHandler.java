package com.ordnance.karakal.websocket.handlers;

import com.ordnance.karakal.websocket.GameService;
import com.ordnance.karakal.websocket.messages.CreateMessage;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.util.UUID;

@Component
public class CreateHandler implements MessageHandler<CreateMessage> {
    private GameService gameService;
    private SimpMessagingTemplate simpMessagingTemplate;
    public CreateHandler(GameService gameService, SimpMessagingTemplate simpMessagingTemplate){
        this.gameService = gameService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @Override
    public void handle(CreateMessage message, Principal principal) {
        UUID gameId = this.gameService.createGame("what");
        this.simpMessagingTemplate.convertAndSendToUser(principal.getName(), "/queue/karakal-created", gameId);
    }
}
