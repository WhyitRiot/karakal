package com.ordnance.karakal.rest.replay;

import com.ordnance.karakal.game.Card;
import com.ordnance.karakal.rest.replay.entities.*;
import com.ordnance.karakal.rest.replay.entities.game_participant.GameParticipant;
import com.ordnance.karakal.rest.replay.objects.*;
import com.ordnance.karakal.rest.replay.repositories.*;
import com.ordnance.karakal.rest.user.User;
import com.ordnance.karakal.rest.user.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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
        this.userRepository = userRepository;
    }

    public List<GameOverview> getAlLGamesByPlayerId(UUID playerId){
        List<Game> games = gameRepository.findGamesByPlayerId(playerId);
        return games.stream().map(game -> {
            List<PlayerScore> leaderboard = roundScoreRepository.getLeaderboard(game.getGameId());
            return new GameOverview(game, leaderboard);
        }).toList();
    }

    public GameReplay getReplay(UUID gameId){
        Game game = gameRepository.getReferenceById(gameId);
        List<User> players = gameParticipantRepository.findUsersByGameId(gameId);
        List<ScoresReplay> leaderboard = this.getLeaderboard(gameId)
                .stream().map(score -> {
                    return new ScoresReplay(score.getPlayerId(), score.getUsername(), score.getTotalScore());
                }).toList();
        List<Round> rounds = roundRepository.findByGameIdOrderByRoundNumber(gameId);
        List<RoundReplay> roundReplays = rounds.stream().map(round -> {
            List<Card> initialDeck = round.getInitialDeck();
            Map<UUID, List<Card>> startingHands = round.getStartingHands();
            List<EventsReplay> events = gameEventRepository.findByGameIdAndRoundIdOrderBySequenceNumber(gameId, round.getId())
                    .stream().map(event -> {
                        return new EventsReplay(event.getSequenceNumber(), event.getPlayerId(), event.getPlayerUsername(), event.getDrawType(), event.getActionData());
                    }).toList();
            List<ScoresReplay> scores = roundScoreRepository.findByRoundId(round.getId())
                    .stream().map(score -> {
                        return new ScoresReplay(score.getPlayerId(), score.getPlayerUsername(), score.getScore());
                    }).toList();
            return mapToRoundReplay(initialDeck, startingHands, events, scores);
        }).toList();
        return mapToGameReplay(game, players, leaderboard, roundReplays);
    }

    public GameReplay mapToGameReplay(Game game, List<User> players, List<ScoresReplay> results, List<RoundReplay> replays){
        return new GameReplay(game, players, results, replays);
    }

    public RoundReplay mapToRoundReplay(List<Card> initialDeck, Map<UUID, List<Card>> startingHands, List<EventsReplay> events, List<ScoresReplay> scores){
        return new RoundReplay(initialDeck, startingHands, events, scores);
    }

    public Integer getLastRoundNumber(UUID gameId){
        Round round = this.roundRepository.findFirstByGame_GameIdOrderByRoundNumberDesc(gameId);
        if (round == null){
            return 1;
        }
        Integer lastSequence = this.roundRepository.findLastRoundNumber(gameId);
//        Integer lastSequence = this.gameEventRepository.findMaxSequenceByRoundId(round.getId());
        return (lastSequence == null) ? 1 : lastSequence + 1;
    }

    public Game createGame(UUID gameId){
        return this.gameRepository.save(new Game(gameId, "IN_PROGRESS", null));
    }
    public GameParticipant addPlayer(UUID playerId, UUID gameId){
        Game game = this.gameRepository.getReferenceById(gameId);
        User user = this.userRepository.getReferenceById(playerId);
        return this.gameParticipantRepository.save(new GameParticipant(game, user));
    }
    public Round newRound(UUID gameId, Card initialDiscard, List<Card> initialDeck, Map<UUID, List<Card>> startingHands){
        Game game = this.gameRepository.getReferenceById(gameId);
        int roundNumber = this.getLastRoundNumber(gameId);
        return this.roundRepository.save(new Round(game, roundNumber, initialDiscard, initialDeck, startingHands, "STARTED"));
    }
    public GameEvent playAction(UUID gameId, UUID playerId, String drawType, Action action){
        Game game = this.gameRepository.getReferenceById(gameId);
        User user = this.userRepository.getReferenceById(playerId);
        Round round = this.roundRepository.findFirstByGame_GameIdOrderByRoundNumberDesc(gameId);
        Integer lastSequence = this.gameEventRepository.findMaxSequenceByRoundId(round.getId());
        int nextSequence = (lastSequence == null) ? 1 : lastSequence + 1;
        return this.gameEventRepository.save(new GameEvent(game, user, round, nextSequence, drawType, action));
    }
    public RoundScore enterPlayerScore(UUID gameId, UUID playerId, Long score){
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
