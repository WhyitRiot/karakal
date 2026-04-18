package com.ordnance.karakal.game;

public enum Rank {
    Joker(0),
    Ace(1),
    Two(2),
    Three(3),
    Four(4),
    Five(5),
    Six(6),
    Seven(7),
    Eight(8),
    Nine(9),
    Ten(10),
    Jack(11),
    Queen(12),
    King(13);

    private final int rank;

    Rank(int i) {
        this.rank = i;
    }
    public int getValue(){
        return rank;
    }
    public boolean isJoker(){
        return this == Joker;
    }
}
