package com.ordnance.karakal.rest.replay.objects;

import com.ordnance.karakal.rest.replay.entities.Game;
import com.ordnance.karakal.rest.replay.entities.PlayerScore;

import java.util.List;

public class GameOverview {
    private Game game;
    private List<PlayerScore> leaderboard;

    public Game getGames() {
        return game;
    }

    public List<PlayerScore> getReplay() {
        return leaderboard;
    }

    public GameOverview(Game games, List<PlayerScore> leaderboard) {
        this.game = game;
        this.leaderboard = leaderboard;
    }
}
