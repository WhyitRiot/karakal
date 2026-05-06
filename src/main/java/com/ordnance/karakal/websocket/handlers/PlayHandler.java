package com.ordnance.karakal.websocket.handlers;

import com.ordnance.karakal.game.Card;
import com.ordnance.karakal.rest.replay.ReplayService;
import com.ordnance.karakal.rest.replay.entities.Action;
import com.ordnance.karakal.websocket.GameService;
import com.ordnance.karakal.websocket.messages.DRAW;
import com.ordnance.karakal.websocket.messages.PlayMessage;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.util.UUID;

@Component
public class PlayHandler implements MessageHandler<PlayMessage>{
    private GameService gameService;
    private ReplayService replayService;
    private SimpMessagingTemplate simpMessagingTemplate;
    public PlayHandler(GameService gameService, ReplayService replayService, SimpMessagingTemplate simpMessagingTemplate){
        this.gameService = gameService;
        this.replayService = replayService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }
    @Override
    public void handle(PlayMessage message, Principal principal) {
        this.gameService.discardAction(message.gameId, message.playerId, message.discardIds);
        Action playerAction = new Action();
        playerAction.setDiscard(this.gameService.resolveCardsIdentity(message.gameId, message.discardIds));
        if (message.drawType == DRAW.DECK){
            this.gameService.drawFromDeck(message.gameId);
        }
        if (message.drawType == DRAW.DISCARD){
            this.gameService.drawFromDiscard(message.gameId, message.drawCardId);
            playerAction.setDraw(this.gameService.resolveCardIdentity(message.gameId, message.drawCardId));
        }
        if (message.drawType == DRAW.DECK){
            Card drawnCard = this.gameService.getLastCardFromDeck(message.gameId);
            this.simpMessagingTemplate.convertAndSendToUser(principal.getName(), "/queue/draw", drawnCard);
            playerAction.setDraw(drawnCard);
        }
        this.simpMessagingTemplate.convertAndSendToUser(principal.getName(), "/queue/player-state", this.gameService.getPlayerState(message.gameId, message.playerId));
        this.simpMessagingTemplate.convertAndSend("/game/" + message.gameId, this.gameService.currentState(message.gameId));
        this.replayService.playAction(message.gameId, UUID.fromString(principal.getName()), message.drawType.toString(), playerAction);
    }
}
