package com.ordnance.karakal.websocket.handlers;

import com.ordnance.karakal.websocket.GameService;
import com.ordnance.karakal.websocket.messages.JoinMessage;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.util.UUID;

@Component
public class JoinHandler implements MessageHandler<JoinMessage>{
    private GameService gameService;
    private SimpMessagingTemplate simpMessagingTemplate;
    public JoinHandler(GameService gameService, SimpMessagingTemplate simpMessagingTemplate){
        this.gameService = gameService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }
    @Override
    public void handle(JoinMessage message, Principal principal) {
        UUID playerId = UUID.fromString(principal.getName());
        gameService.addPlayer(message.gameId, message.playerName, UUID.fromString(principal.getName()));
        this.simpMessagingTemplate.convertAndSendToUser(principal.getName(), "/queue/new-player", playerId);
        this.simpMessagingTemplate.convertAndSendToUser(principal.getName(), "/queue/player-state", this.gameService.getPlayerState(message.gameId, playerId));
        this.simpMessagingTemplate.convertAndSend("/game/" + message.gameId, this.gameService.currentState(message.gameId));
    }
}
