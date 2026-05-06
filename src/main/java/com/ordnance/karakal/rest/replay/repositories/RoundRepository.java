package com.ordnance.karakal.rest.replay.repositories;

import com.ordnance.karakal.rest.replay.entities.Round;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RoundRepository extends JpaRepository<Round, Long> {
    @Query(
            "SELECT COALESCE(MAX(r.roundNumber), 0) from Round r where r.game.gameId = :gameId"
    )
    Integer findLastRoundNumber(@Param("gameId") UUID gameId);
    Round findFirstByGame_GameIdOrderByRoundNumberDesc(UUID gameId);
    @Query(
            "SELECT r FROM Round r WHERE r.game.gameId = :gameId"
    )
    List<Round> findByGameIdOrderByRoundNumber(@Param("gameId") UUID gameId);
}
