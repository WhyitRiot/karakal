package com.ordnance.karakal.rest.game;

import com.ordnance.karakal.rest.game.entities.game_participant.GameParticipant;
import com.ordnance.karakal.rest.game.entities.game_participant.GameParticipantId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameParticipantRepository extends JpaRepository<GameParticipant, GameParticipantId> {
}
