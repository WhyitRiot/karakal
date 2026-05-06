package com.ordnance.karakal.rest.replay.entities;

import com.ordnance.karakal.game.Card;

import java.util.List;

public class Action {
    private List<Card> discard;
    private Card draw;
    private boolean karakal;
    private boolean stay;

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
    public void setKarakal(boolean karakal){
        this.karakal = karakal;
    }
    public void setStay(boolean stay){
        this.stay = stay;
    }

    public Action() {
    }

    public Action(List<Card> discard, Card draw) {
        this.discard = discard;
        this.draw = draw;
        this.karakal = false;
        this.stay = false;
    }
}
