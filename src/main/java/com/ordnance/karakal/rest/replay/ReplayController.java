package com.ordnance.karakal.rest.replay;

import com.ordnance.karakal.rest.replay.objects.GameOverview;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("/replay")
@CrossOrigin("*")
public class ReplayController {
    private ReplayService replayService;
    public ReplayController(ReplayService replayService){
        this.replayService = replayService;
    }

    @GetMapping("/{playerId}")
    public ResponseEntity<List<GameOverview>> getReplaysByPlayerId(@PathVariable UUID playerId){
        List<GameOverview> gameOverviews = this.replayService.getAlLGamesByPlayerId(playerId);
        return ResponseEntity.ok(gameOverviews);
    }
}
