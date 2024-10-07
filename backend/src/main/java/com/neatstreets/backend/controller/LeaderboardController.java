package com.neatstreets.backend.controller;

import com.neatstreets.backend.enums.Role;
import com.neatstreets.backend.model.User;
import com.neatstreets.backend.service.LeaderboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/leaderboard")
public class LeaderboardController {
    private final LeaderboardService leaderboardService;

    public LeaderboardController(LeaderboardService leaderboardService){
        this.leaderboardService = leaderboardService;
    }

    @GetMapping("/role/{role}")
    public ResponseEntity<?> getTopUsersByRole(@PathVariable Role role) {
        return leaderboardService.getTopUsersByRole(role);
    }

    @PutMapping("/addPoints/{userId}")
    public ResponseEntity<?> addPointsToUser(@PathVariable UUID userId, @RequestBody int points) {
        return leaderboardService.addPointsToUser(userId, points);
    }
}
