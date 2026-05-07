package com.ordnance.karakal.rest.replay.objects;

import com.ordnance.karakal.game.Card;
import com.ordnance.karakal.rest.replay.entities.GameEvent;
import com.ordnance.karakal.rest.replay.entities.Round;
import com.ordnance.karakal.rest.replay.entities.RoundScore;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public class RoundReplay {
    List<Card> initialDeck;
    Map<UUID, List<Card>> startingHands;
    List<EventsReplay> events;
    List<ScoresReplay> scores;

    public Map<UUID, List<Card>> getStartingHands(){return startingHands;}

    public List<Card> getInitialDeck(){return initialDeck;}

    public List<EventsReplay> getEvents() {
        return events;
    }

    public List<ScoresReplay> getScores(){return scores;}

    public RoundReplay(List<Card> initialDeck, Map<UUID, List<Card>>startingHands, List<EventsReplay> events, List<ScoresReplay> scores) {
        this.initialDeck = initialDeck;
        this.startingHands = startingHands;
        this.events = events;
        this.scores = scores;
    }
}
