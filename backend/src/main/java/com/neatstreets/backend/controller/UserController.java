package com.neatstreets.backend.controller;

import com.neatstreets.backend.dtos.EndUserDto;
import com.neatstreets.backend.dtos.PostDto;
import com.neatstreets.backend.dtos.UserDto;
import com.neatstreets.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {


    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public ResponseEntity<UserDto> getCurrentUser(Authentication authentication) {
        return userService.getCurrentUser(authentication);
    }

    @GetMapping
    public ResponseEntity<UserDto> getUserById(@RequestParam UUID id){
        return userService.getUserById(id);
    }

    @GetMapping("/{id}/posts")
    public ResponseEntity<List<PostDto>> getUserPosts(@PathVariable UUID id){
        return userService.getUserPosts(id);
    }
}
