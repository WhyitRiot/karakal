package com.ordnance.karakal.rest.game.entities;

import com.ordnance.karakal.rest.user.User;
import jakarta.persistence.*;

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
    private Integer score;

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

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public RoundScore() {
    }

    public RoundScore(Round round, User user, Integer score) {
        this.round = round;
        this.score = score;
        this.player = user;
    }
}
