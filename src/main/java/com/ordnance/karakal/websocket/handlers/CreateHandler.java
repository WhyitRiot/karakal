package com.ordnance.karakal.websocket.handlers;

import com.ordnance.karakal.rest.replay.ReplayService;
import com.ordnance.karakal.websocket.GameService;
import com.ordnance.karakal.websocket.messages.CreateMessage;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.util.UUID;

@Component
public class CreateHandler implements MessageHandler<CreateMessage> {
    private GameService gameService;
    private ReplayService replayService;
    private SimpMessagingTemplate simpMessagingTemplate;
    public CreateHandler(GameService gameService, ReplayService replayService, SimpMessagingTemplate simpMessagingTemplate){
        this.gameService = gameService;
        this.replayService = replayService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @Override
    public void handle(CreateMessage message, Principal principal) {
        UUID gameId = this.gameService.createGame("what");
        this.simpMessagingTemplate.convertAndSendToUser(principal.getName(), "/queue/karakal-created", gameId);
        this.replayService.createGame(gameId);
    }
}
