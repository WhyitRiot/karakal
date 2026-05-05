package com.ordnance.karakal.rest.game.objects;

import com.ordnance.karakal.rest.game.entities.Action;

import java.time.Instant;
import java.util.UUID;

public class EventsReplay {
    private int sequence_number;
    private UUID playerId;

    public UUID getPlayerId() {
        return playerId;
    }

    private String action_type;
    private Action action;
    private Instant created_at;

    public int getSequence_number() {
        return sequence_number;
    }

    public String getAction_type() {
        return action_type;
    }

    public Action getAction() {
        return action;
    }

    public Instant getCreated_at() {
        return created_at;
    }

    public EventsReplay(int sequence_number, UUID playerId, String action_type, Action action, Instant created_at) {
        this.sequence_number = sequence_number;
        this.playerId = playerId;
        this.action_type = action_type;
        this.action = action;
        this.created_at = created_at;
    }
}
