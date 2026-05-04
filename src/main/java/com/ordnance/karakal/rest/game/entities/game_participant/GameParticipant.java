package com.ordnance.karakal.rest.game.entities.game_participant;

import com.ordnance.karakal.rest.game.entities.Game;
import com.ordnance.karakal.rest.user.User;
import jakarta.persistence.*;

@Entity
@Table(name = "game_participants")
public class GameParticipant {
    @EmbeddedId
    private GameParticipantId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("gameId")
    @JoinColumn(name = "game_id", nullable = false)
    private Game game;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public GameParticipant(Game game, User user) {
        this.game = game;
        this.user = user;

        this.id = new GameParticipantId(game.getGameId(), user.getPlayerId());
    }

    public GameParticipantId getId() {
        return id;
    }

    public void setId(GameParticipantId id) {
        this.id = id;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public GameParticipant() {
    }
}
