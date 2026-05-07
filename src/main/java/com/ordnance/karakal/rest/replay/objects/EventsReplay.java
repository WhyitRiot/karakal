package com.ordnance.karakal.rest.replay.objects;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ordnance.karakal.rest.replay.entities.Action;

import java.time.Instant;
import java.util.UUID;

public class EventsReplay {
    private int sequence_number;
    private UUID playerId;
    private String username;
    private String action_type;
    private Action action;

    @JsonCreator
    public EventsReplay(@JsonProperty("sequence_number") int sequence_number,@JsonProperty("playerId") UUID playerId, @JsonProperty("username") String username, @JsonProperty("action_type") String action_type, @JsonProperty("action") Action action) {
        this.sequence_number = sequence_number;
        this.playerId = playerId;
        this.username = username;
        this.action_type = action_type;
        this.action = action;
    }

    public void setSequence_number(int sequence_number) {
        this.sequence_number = sequence_number;
    }

    public void setPlayerId(UUID playerId) {
        this.playerId = playerId;
    }

    public UUID getPlayerId() {
        return playerId;
    }

    public void setAction_type(String action_type) {
        this.action_type = action_type;
    }

    public void setAction(Action action) {
        this.action = action;
    }

    public String getUsername() { return username;}

    public void setUsername(String username) { this.username = username;}

    public int getSequence_number() {
        return sequence_number;
    }

    public String getAction_type() {
        return action_type;
    }

    public Action getAction() {
        return action;
    }

}
