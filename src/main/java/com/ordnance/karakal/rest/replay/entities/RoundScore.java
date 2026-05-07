package com.ordnance.karakal.rest.replay.entities;

import com.ordnance.karakal.rest.user.User;
import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "round_score")
public class RoundScore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "round_id", nullable = false)
    private Round round;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "player_id", nullable = false)
    private User player;

    @Column(nullable = false)
    private Long score;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Round getRound() {
        return round;
    }

    public void setRound(Round round) {
        this.round = round;
    }

    public Long getScore() {
        return score;
    }

    public void setScore(Long score) {
        this.score = score;
    }

    public User getPlayer() {
        return player;
    }

    public UUID getPlayerId(){
        return player.getPlayerId();
    }

    public String getPlayerUsername(){
        return player.getUsername();
    }

    public RoundScore() {
    }

    public RoundScore(Round round, User user, Long score) {
        this.round = round;
        this.score = score;
        this.player = user;
    }
}
