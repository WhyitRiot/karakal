package com.ordnance.karakal.rest.replay.objects;

import com.ordnance.karakal.rest.replay.entities.Game;
import com.ordnance.karakal.rest.replay.entities.PlayerScore;

import java.util.List;

public class GameOverview {
    private Game game;
    private List<PlayerScore> leaderboard;

    public Game getGame() {
        return game;
    }

    public List<PlayerScore> getLeaderboard() {
        return leaderboard;
    }

    public GameOverview(Game games, List<PlayerScore> leaderboard) {
        this.game = games;
        this.leaderboard = leaderboard;
    }
}
