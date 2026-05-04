package com.ordnance.karakal.rest.game;

import com.ordnance.karakal.rest.game.entities.RoundScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoundScoreRepository extends JpaRepository<RoundScore, Long> {
}
