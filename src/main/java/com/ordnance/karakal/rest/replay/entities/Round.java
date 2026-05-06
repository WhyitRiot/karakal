package com.ordnance.karakal.rest.replay.entities;

import com.ordnance.karakal.game.Card;
import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Entity
@Table(name = "game_rounds")
public class Round {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "game_id", nullable = false)
    private Game game;

    @Column(name = "round_number")
    private Integer roundNumber;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "initial_deck", columnDefinition = "jsonb")
    private List<Card> initialDeck;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "starting_hands", columnDefinition = "jsonb")
    private Map<UUID, List<Card>> startingHands;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "initial_discard", columnDefinition = "jsonb")
    private Card initialDiscard;

    @Column(length = 20)
    private String status;

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

    public Integer getRoundNumber() {
        return roundNumber;
    }

    public void setRoundNumber(Integer roundNumber) {
        this.roundNumber = roundNumber;
    }

    public List<Card> getInitialDeck() {
        return initialDeck;
    }

    public void setInitialDeck(List<Card> initialDeck) {
        this.initialDeck = initialDeck;
    }

    public Map<UUID, List<Card>> getStartingHands() {
        return startingHands;
    }

    public void setStartingHands(Map<UUID, List<Card>> startingHands) {
        this.startingHands = startingHands;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Round() {
    }

    public Round(Game game, Integer roundNumber, Card initialDiscard, List<Card> initialDeck, Map<UUID, List<Card>> startingHands, String status) {
        this.game = game;
        this.roundNumber = roundNumber;
        this.initialDiscard = initialDiscard;
        this.initialDeck = initialDeck;
        this.startingHands = startingHands;
        this.status = status;
    }

    public Card getInitialDiscard() {
        return initialDiscard;
    }

    public void setInitialDiscard(Card initialDiscard) {
        this.initialDiscard = initialDiscard;
    }
}
