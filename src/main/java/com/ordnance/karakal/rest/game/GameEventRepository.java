package com.ordnance.karakal.rest.game;

import com.ordnance.karakal.rest.game.entities.GameEvent;
import com.ordnance.karakal.rest.game.entities.Round;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface GameEventRepository extends JpaRepository<GameEvent, Long> {
    public Integer findMaxSequenceByRoundId(@Param("roundId") Long roundId);
}
