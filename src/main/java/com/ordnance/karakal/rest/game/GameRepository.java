package com.ordnance.karakal.rest.game;

import com.ordnance.karakal.rest.game.entities.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface GameRepository extends JpaRepository<Game, UUID> {
    @Query(
            "SELECT DISTINCT gp.game FROM GameParticipant gp WHERE gp.user.playerId = :playerId"
    )
    List<Game> findGamesByPlayerId(@Param("playerId") UUID playerId);
}
