package com.ordnance.karakal.game;

import java.util.Comparator;

public class Card {
    private final long id;
    private final Suit suit;
    private final Rank rank;
    private final boolean isJoker;

    public Suit getSuit() {
        return suit;
    }

    public boolean isJoker(){
        return this.isJoker;
    }

    public Rank getRank() {
        return rank;
    }

    public long getId(){
        return this.id;
    }

    public Card(Long id, Suit suit, Rank rank) {
        if (rank == Rank.Joker && suit != null){
            throw new IllegalArgumentException("Joker cannot have a suit");
        }
        if (suit == null && rank != Rank.Joker){
            throw new IllegalArgumentException("Non-joker must have a suit");
        }
        this.id = id;
        this.rank = rank;
        this.suit = suit;
        this.isJoker = rank.isJoker();
    }

    @Override
    public String toString() {
        return "Card{" +
                "id=" + id +
                ", suit=" + suit +
                ", rank=" + rank +
                ", isJoker=" + isJoker +
                '}';
    }

    public static final Comparator<Card> BY_RANK =
            (a, b) -> {
                if (a.rank == Rank.Joker || b.rank == Rank.Joker) {
                    return 0;
                }
                return Integer.compare(a.rank.getValue(), b.rank.getValue());
            };
}
