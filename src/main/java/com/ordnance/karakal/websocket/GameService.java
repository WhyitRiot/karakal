package com.ordnance.karakal.websocket;

import com.github.f4b6a3.uuid.UuidCreator;
import com.ordnance.karakal.game.*;
import org.springframework.stereotype.Service;

import java.util.*;

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

    public ReplayState getReplayState(UUID gameId){
        return this.games.get(gameId).getReplayState();
    }

    public boolean isGameOver(UUID gameId){
        return this.games.get(gameId).isGameOver();
    }

    public List<Card> resolveCardsIdentity(UUID gameId, List<Long> cardIds){
        return this.games.get(gameId).resolveCardsIdentity(cardIds);
    }
    public Card resolveCardIdentity(UUID gameId, Long id){
        return this.games.get(gameId).resolveCardIdentity(id);
    }

    public List<UUID> getAllPlayers(UUID gameId){
        return this.games.get(gameId).getPlayers();
    }

    public UUID createGame(String Id){
        UUID gameId = UuidCreator.getTimeOrderedEpoch();
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

    public void stay(UUID gameId){
        this.games.get(gameId).stay();
    }

    public TreeMap<UUID, Integer> getLeaderboard(UUID gameId){
        return this.games.get(gameId).getLeaderboard();
    }
}
