package com.ordnance.karakal.rest.game.entities;

import com.ordnance.karakal.game.Card;

import java.util.List;

public class Action {
    private List<Card> discard;
    private Card draw;

    public List<Card> getDiscard() {
        return discard;
    }

    public void setDiscard(List<Card> discard) {
        this.discard = discard;
    }

    public Card getDraw() {
        return draw;
    }

    public void setDraw(Card draw) {
        this.draw = draw;
    }

    public Action() {
    }

    public Action(List<Card> discard, Card draw) {
        this.discard = discard;
        this.draw = draw;
    }
}
