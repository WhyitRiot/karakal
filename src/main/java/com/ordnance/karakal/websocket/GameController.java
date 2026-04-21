package com.ordnance.karakal.websocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
public class GameController{
    private final GameService gameService;

    public GameController(GameService gameService){
        this.gameService = gameService;
    }

    @MessageMapping("/play")
    public void handleMessage(){

    }

}
