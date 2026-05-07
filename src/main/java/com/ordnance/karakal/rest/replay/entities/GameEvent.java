package com.ordnance.karakal.rest.replay.entities;

import com.ordnance.karakal.rest.user.User;
import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.UUID;

@Entity
public class GameEvent {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id", nullable = false)
    private Game game;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "player_id", nullable = false)
    private User player;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "round_id", nullable = false)
    private Round round;

    @Column(name = "sequence_number")
    private Integer sequenceNumber;

    @Column(name = "draw_type")
    private String drawType;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "action_data", columnDefinition = "jsonb")
    private Action actionData;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public Round getRound() {
        return round;
    }

    public void setRound(Round round) {
        this.round = round;
    }

    public Integer getSequenceNumber() {
        return sequenceNumber;
    }

    public User getPlayer() {return player;}
    public UUID getPlayerId(){return player.getPlayerId();}
    public String getPlayerUsername(){return player.getUsername();}

    public void setSequenceNumber(Integer sequenceNumber) {
        this.sequenceNumber = sequenceNumber;
    }

    public String getDrawType() {
        return drawType;
    }

    public void setDrawType(String drawType) {
        this.drawType = drawType;
    }

    public Action getActionData() {
        return actionData;
    }

    public void setActionData(Action actionData) {
        this.actionData = actionData;
    }

    public GameEvent() {
    }

    public GameEvent(Game game, User player, Round round, Integer sequenceNumber, String drawType, Action actionData) {
        this.game = game;
        this.round = round;
        this.sequenceNumber = sequenceNumber;
        this.drawType = drawType;
        this.actionData = actionData;
        this.player = player;
    }
}
