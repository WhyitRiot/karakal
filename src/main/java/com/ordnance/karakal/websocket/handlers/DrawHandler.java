package com.ordnance.karakal.websocket.handlers;

import com.ordnance.karakal.websocket.DRAW;
import com.ordnance.karakal.websocket.GameService;
import com.ordnance.karakal.websocket.messages.DrawMessage;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.util.UUID;

@Component
public class DrawHandler implements MessageHandler<DrawMessage>{
    private GameService gameService;
    private SimpMessagingTemplate simpMessagingTemplate;
    public DrawHandler(GameService gameService, SimpMessagingTemplate simpMessagingTemplate){
        this.gameService = gameService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }
    @Override
    public void handle(DrawMessage message, Principal principal) {
        if (message.drawType == DRAW.DECK){
            this.gameService.drawFromDeck(message.gameId);
        }
        if (message.drawType == DRAW.DISCARD){
            this.gameService.drawFromDiscard(message.gameId, message.cardId);
        }
        System.out.println(principal.getName());
        this.simpMessagingTemplate.convertAndSendToUser(principal.getName(), "/queue/player-state", this.gameService.getPlayerState(message.gameId, message.playerId));
        this.simpMessagingTemplate.convertAndSend("/game/" + message.gameId, this.gameService.currentState(message.gameId));
    }
}
