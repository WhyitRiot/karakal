package com.ordnance.karakal.websocket;

import com.ordnance.karakal.websocket.messages.ClientMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
public class GameController{
    private final GameService gameService;
    private final MessageDispatcher messageDispatcher;

    public GameController(GameService gameService, MessageDispatcher messageDispatcher){
        this.gameService = gameService;
        this.messageDispatcher = messageDispatcher;
    }

    @MessageMapping("/play")
    public void handleMessage(ClientMessage message, Principal principal){
        messageDispatcher.dispatch(message, principal);
    }
}
