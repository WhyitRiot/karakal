package com.ordnance.karakal.websocket.handlers;

import com.ordnance.karakal.rest.replay.ReplayService;
import com.ordnance.karakal.rest.replay.entities.Action;
import com.ordnance.karakal.websocket.GameService;
import com.ordnance.karakal.websocket.messages.StayMessage;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.util.UUID;

@Component
public class StayHandler implements MessageHandler<StayMessage> {
    private GameService gameService;
    private ReplayService replayService;
    private SimpMessagingTemplate simpMessagingTemplate;
    public StayHandler(GameService gameService, ReplayService replayService, SimpMessagingTemplate simpMessagingTemplate){
        this.gameService = gameService;
        this.replayService = replayService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }
    @Override
    public void handle(StayMessage message, Principal principal) {
        this.gameService.stay(message.gameId);
        Action playerAction = new Action();
        playerAction.setStay(true);
        this.simpMessagingTemplate.convertAndSend("/game/" + message.gameId, this.gameService.currentState(message.gameId));
        this.replayService.playAction(message.gameId, UUID.fromString(principal.getName()), "STAY", playerAction);
        if (this.gameService.isGameOver(message.gameId)){
            this.replayService.endGame(message.gameId);
        }
    }
}
