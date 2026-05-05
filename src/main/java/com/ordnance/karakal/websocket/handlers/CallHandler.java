package com.ordnance.karakal.websocket.handlers;

import com.ordnance.karakal.rest.game.ReplayService;
import com.ordnance.karakal.rest.game.entities.Action;
import com.ordnance.karakal.websocket.GameService;
import com.ordnance.karakal.websocket.messages.CallMessage;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.util.UUID;

@Component
public class CallHandler implements MessageHandler<CallMessage>{
    private GameService gameService;
    private ReplayService replayService;
    private SimpMessagingTemplate simpMessagingTemplate;
    public CallHandler(GameService gameService, ReplayService replayService, SimpMessagingTemplate simpMessagingTemplate){
        this.gameService = gameService;
        this.replayService = replayService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }
    public void handle(CallMessage message, Principal principal){
        this.gameService.callKarakal(message.gameId);
        Action playerAction = new Action();
        playerAction.setKarakal(true);
        simpMessagingTemplate.convertAndSend("/game/" + message.gameId.toString(), this.gameService.currentState(message.gameId));
        this.replayService.playAction(message.gameId, UUID.fromString(principal.getName()), null, playerAction);
    }
}
