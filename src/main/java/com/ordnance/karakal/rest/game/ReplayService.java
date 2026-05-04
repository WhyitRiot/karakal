package com.ordnance.karakal.rest.game;

import com.ordnance.karakal.game.Card;
import com.ordnance.karakal.rest.game.entities.*;
import com.ordnance.karakal.rest.game.entities.game_participant.GameParticipant;
import com.ordnance.karakal.rest.user.User;
import com.ordnance.karakal.rest.user.UserRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
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
}
