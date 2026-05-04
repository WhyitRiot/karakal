package com.ordnance.karakal.rest.game;

import com.ordnance.karakal.rest.game.entities.PlayerScore;
import com.ordnance.karakal.rest.game.entities.RoundScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RoundScoreRepository extends JpaRepository<RoundScore, Long> {
    @Query(
            "SELECT rs.player.playerId as playerId, SUM(rs.score) as totalScore " +
                    "FROM RoundScore rs " +
                    "WHERE rs.round.game.gameId = :gameId " +
                    "GROUP BY rs.player.playerId " +
                    "ORDER BY totalScore ASC"
    )
    List<PlayerScore> getLeaderboard(@Param("gameId") UUID gameId);
}
