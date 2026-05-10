package com.ordnance.karakal.rest.replay;

import com.ordnance.karakal.rest.replay.objects.GameOverview;
import com.ordnance.karakal.rest.replay.objects.GameReplay;
import com.ordnance.karakal.rest.replay.entities.Game;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
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

    @GetMapping("/game/{gameId}")
    public ResponseEntity<GameReplay> getReplayByGameId(@PathVariable UUID gameId){
        GameReplay replay = this.replayService.getReplay(gameId);
        return ResponseEntity.ok(replay);
    }
    @DeleteMapping("/game/{gameId}")
    public ResponseEntity<Void> deleteGame(@PathVariable UUID gameId){
        System.out.println("DELETE");
        Game deleteGame = this.replayService.deleteGame(gameId);
        if (deleteGame == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }
}
