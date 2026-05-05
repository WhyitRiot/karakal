package com.ordnance.karakal.rest.game.objects;

import com.ordnance.karakal.rest.game.entities.Game;
import com.ordnance.karakal.rest.game.entities.Round;
import com.ordnance.karakal.rest.user.User;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public class GameReplay {
    private Game game;
    private List<User> player;
    private List<RoundReplay> roundReplays;

    public Game getGame() {
        return game;
    }

    public List<User> getPlayer() {
        return player;
    }

    public List<RoundReplay> getRoundReplays() {
        return roundReplays;
    }

    public GameReplay(Game game, List<User> player, List<RoundReplay> roundReplays) {
        this.game = game;
        this.player = player;
        this.roundReplays = roundReplays;
    }
}
