package com.ordnance.karakal.websocket.handlers;

import com.ordnance.karakal.websocket.GameService;
import com.ordnance.karakal.websocket.messages.DRAW;
import com.ordnance.karakal.websocket.messages.PlayMessage;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.security.Principal;
@Component
public class PlayHandler implements MessageHandler<PlayMessage>{
    private GameService gameService;
    private SimpMessagingTemplate simpMessagingTemplate;
    public PlayHandler(GameService gameService, SimpMessagingTemplate simpMessagingTemplate){
        this.gameService = gameService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }
    @Override
    public void handle(PlayMessage message, Principal principal) {
        this.gameService.discardAction(message.gameId, message.playerId, message.discardIds);
        if (message.drawType == DRAW.DECK){
            this.gameService.drawFromDeck(message.gameId);
        }
        if (message.drawType == DRAW.DISCARD){
            this.gameService.drawFromDiscard(message.gameId, message.drawCardId);
        }
        if (message.drawType == DRAW.DECK){
            this.simpMessagingTemplate.convertAndSendToUser(principal.getName(), "/queue/draw", this.gameService.getLastCardFromDeck(message.gameId));
        }
        this.simpMessagingTemplate.convertAndSendToUser(principal.getName(), "/queue/player-state", this.gameService.getPlayerState(message.gameId, message.playerId));
        this.simpMessagingTemplate.convertAndSend("/game/" + message.gameId, this.gameService.currentState(message.gameId));

    }
}
