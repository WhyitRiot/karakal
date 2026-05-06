package com.ordnance.karakal.rest.replay.objects;

import com.ordnance.karakal.rest.replay.entities.GameEvent;
import com.ordnance.karakal.rest.replay.entities.Round;
import com.ordnance.karakal.rest.replay.entities.RoundScore;

import java.util.List;

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
