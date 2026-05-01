package com.ordnance.karakal.websocket.handlers;

import com.ordnance.karakal.websocket.GameService;
import com.ordnance.karakal.websocket.messages.StartNextRoundMessage;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

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
        List<UUID> players = this.gameService.getAllPlayers(message.gameId);
        for (UUID id : players){
            this.simpMessagingTemplate.convertAndSendToUser(id.toString(), "/queue/player-state", this.gameService.getPlayerState(message.gameId, id));
        }
        this.simpMessagingTemplate.convertAndSend("/game/" + message.gameId, this.gameService.currentState(message.gameId));
    }
}
