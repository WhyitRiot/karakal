package com.ordnance.karakal.websocket.handlers;


import com.ordnance.karakal.websocket.GameService;
import com.ordnance.karakal.websocket.messages.DiscardMessage;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.util.UUID;

@Component
public class DiscardHandler implements MessageHandler<DiscardMessage>{
    private GameService gameService;
    private SimpMessagingTemplate simpMessagingTemplate;
    public DiscardHandler(GameService gameService, SimpMessagingTemplate simpMessagingTemplate){
        this.gameService = gameService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }
    @Override
    public void handle(DiscardMessage message, Principal principal) {
        this.gameService.discardAction(message.gameId, message.playerId, message.cardIds);
        this.simpMessagingTemplate.convertAndSendToUser(principal.getName(), "/queue/player-state", this.gameService.getPlayerState(message.gameId, message.playerId));
        this.simpMessagingTemplate.convertAndSend("/game/" + message.gameId, this.gameService.currentState(message.gameId));
    }
}
