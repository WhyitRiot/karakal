package com.ordnance.karakal.websocket.handlers;

import com.ordnance.karakal.game.GameState;
import com.ordnance.karakal.websocket.GameService;
import com.ordnance.karakal.websocket.messages.StartMessage;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.security.Principal;

@Component
public class StartHandler implements MessageHandler<StartMessage>{
    private GameService gameService;
    private SimpMessagingTemplate simpMessagingTemplate;
    public StartHandler(GameService gameService, SimpMessagingTemplate simpMessagingTemplate){
        this.gameService = gameService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @Override
    public void handle(StartMessage message, Principal principal) {
        this.gameService.beginGame(message.gameId);
        this.simpMessagingTemplate.convertAndSend("/game/" + message.gameId, this.gameService.currentState(message.gameId));
    }
}
