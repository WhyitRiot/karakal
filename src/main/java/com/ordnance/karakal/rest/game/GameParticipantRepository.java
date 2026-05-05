package com.ordnance.karakal.rest.game;

import com.ordnance.karakal.rest.game.entities.game_participant.GameParticipant;
import com.ordnance.karakal.rest.game.entities.game_participant.GameParticipantId;
import com.ordnance.karakal.rest.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface GameParticipantRepository extends JpaRepository<GameParticipant, GameParticipantId> {
    @Query(
            "SELECT gp.user FROM GameParticipant gp WHERE gp.game.gameId = :gameId"
    )
    List<User> findUsersByGameId(@Param("gameId") UUID gameId);
}
