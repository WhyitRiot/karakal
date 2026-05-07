package com.ordnance.karakal.rest.replay.objects;

import com.ordnance.karakal.rest.replay.entities.Game;
import com.ordnance.karakal.rest.user.User;

import java.util.List;

public class GameReplay {
    private Game game;
    private List<User> players;
    private List<ScoresReplay> results;
    private List<RoundReplay> rounds;

    public Game getGame() {
        return game;
    }

    public List<User> getPlayers() {
        return players;
    }

    public List<RoundReplay> getRoundReplays() {
        return rounds;
    }

    public List<ScoresReplay> getResults() {return results;}

    public GameReplay(Game game, List<User> players, List<ScoresReplay> results, List<RoundReplay> rounds) {
        this.game = game;
        this.results = results;
        this.players = players;
        this.rounds = rounds;
    }
}
