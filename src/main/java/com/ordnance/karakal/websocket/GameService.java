package com.ordnance.karakal.websocket;

import com.ordnance.karakal.game.Card;
import com.ordnance.karakal.game.GameInstance;
import com.ordnance.karakal.game.GameState;
import com.ordnance.karakal.game.PlayerState;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class GameService {
    private final Map<UUID, GameInstance> games;

    public GameService(){
        this.games = new HashMap<>();
    }

    public GameState currentState(UUID gameId){
        return this.games.get(gameId).getState();
    }

    public PlayerState getPlayerState(UUID gameId, UUID playerId){
        return this.games.get(gameId).getPlayerState(playerId);
    }

    public UUID createGame(String Id){
        UUID gameId = UUID.randomUUID();
        this.games.put(gameId, new GameInstance(Id));
        return gameId;
    }

    public void startNextRound(UUID gameId){
        this.games.get(gameId).startNextRound();
    }

    public Card getLastCardFromDeck(UUID gameId){
        return this.games.get(gameId).getLastCardFromDeck();
    }

    public void addPlayer(UUID gameId, String playerName, UUID playerId){
        this.games.get(gameId).addPlayer(playerId, playerName);
    }

    public void beginGame(UUID gameId){
        this.games.get(gameId).startGame();
    }

    public void discardAction(UUID gameId, UUID playerId, List<Long> cards){
        this.games.get(gameId).discard(playerId, cards);
    }

    public void drawFromDeck(UUID gameId){
        this.games.get(gameId).drawFromDeck();
    }

    public void drawFromDiscard(UUID gameId, long cardId){
        this.games.get(gameId).drawFromDiscard(cardId);
    }

    public void callKarakal(UUID gameId){
        this.games.get(gameId).callKarakal();
    }
}
