package com.ordnance.karakal.rest.game;

import com.ordnance.karakal.game.Card;
import com.ordnance.karakal.rest.game.entities.*;
import com.ordnance.karakal.rest.game.entities.game_participant.GameParticipant;
import com.ordnance.karakal.rest.user.User;
import com.ordnance.karakal.rest.user.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@Transactional
public class ReplayService {
    private UserRepository userRepository;
    private GameRepository gameRepository;
    private GameParticipantRepository gameParticipantRepository;
    private RoundRepository roundRepository;
    private GameEventRepository gameEventRepository;
    private RoundScoreRepository roundScoreRepository;

    public ReplayService(UserRepository userRepository,
                         GameRepository gameRepository,
                         GameParticipantRepository gameParticipantRepository,
                         RoundRepository roundRepository,
                         GameEventRepository gameEventRepository,
                         RoundScoreRepository roundScoreRepository) {
        this.gameRepository = gameRepository;
        this.gameParticipantRepository = gameParticipantRepository;
        this.roundRepository = roundRepository;
        this.gameEventRepository = gameEventRepository;
        this.roundScoreRepository = roundScoreRepository;
    }
    public Game createGame(UUID gameId){
        return this.gameRepository.save(new Game(gameId, "IN_PROGRESS", null));
    }
    public GameParticipant addPlayer(UUID playerId, UUID gameId){
        Game game = this.gameRepository.getReferenceById(gameId);
        User user = this.userRepository.getReferenceById(playerId);
        return this.gameParticipantRepository.save(new GameParticipant(game, user));
    }
    public Round newRound(UUID gameId, Integer roundNumber, List<Card> initialDeck, Map<UUID, List<Card>> startingHands){
        Game game = this.gameRepository.getReferenceById(gameId);
        return this.roundRepository.save(new Round(game, roundNumber, initialDeck, startingHands, "STARTED"));
    }
    public GameEvent playAction(UUID gameId, UUID playerId, String drawType, Action action){
        Game game = this.gameRepository.getReferenceById(gameId);
        User user = this.userRepository.getReferenceById(playerId);
        Round round = this.roundRepository.findFirstByGame_GameIdOrderByRoundNumberDesc(gameId);
        Integer lastSequence = this.gameEventRepository.findMaxSequenceByRoundId(round.getId());
        int nextSequence = (lastSequence == null) ? 1 : lastSequence + 1;
        return this.gameEventRepository.save(new GameEvent(game, user, round, nextSequence, drawType, action));
    }
    public RoundScore enterPlayerScore(UUID gameId, UUID playerId, Integer score){
        Round round = this.roundRepository.findFirstByGame_GameIdOrderByRoundNumberDesc(gameId);
        User user = this.userRepository.getReferenceById(playerId);
        return this.roundScoreRepository.save(new RoundScore(round, user, score));
    }
    public Game endGame(UUID gameId){
        List<PlayerScore> totals = this.roundScoreRepository.getLeaderboard(gameId);
        if (!totals.isEmpty()){
            UUID winnerId = totals.getFirst().getPlayerId();
            Game game = this.gameRepository.getReferenceById(gameId);
            game.setWinner(this.userRepository.getReferenceById(winnerId));
            game.setStatus("COMPLETED");
            return this.gameRepository.save(game);
        }
        return null;
    }
    public List<PlayerScore> getLeaderboard(UUID gameId){
        return this.roundScoreRepository.getLeaderboard(gameId);
    }
}
