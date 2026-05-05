package com.ordnance.karakal.rest.game.objects;

import com.ordnance.karakal.game.Card;
import com.ordnance.karakal.rest.game.entities.GameEvent;
import com.ordnance.karakal.rest.game.entities.Round;
import com.ordnance.karakal.rest.game.entities.RoundScore;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public class RoundReplay {
    private Round round;
    List<GameEvent> events;

    public Round getRound() {
        return round;
    }

    public List<GameEvent> getEvents() {
        return events;
    }

    public List<RoundScore> getScores() {
        return scores;
    }

    public RoundReplay(Round round, List<GameEvent> events, List<RoundScore> scores) {
        this.round = round;
        this.events = events;
        this.scores = scores;
    }

    List<RoundScore> scores;

}
