package com.ordnance.karakal.rest.game;

import com.ordnance.karakal.rest.game.entities.Round;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface RoundRepository extends JpaRepository<Round, Long> {
    Round findFirstByGame_GameIdOrderByRoundNumberDesc(UUID gameId);
}
