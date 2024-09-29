package com.neatstreets.backend.service;


import com.neatstreets.backend.dtos.UserDto;
import com.neatstreets.backend.model.Post;
import com.neatstreets.backend.model.User;
import com.neatstreets.backend.repository.PostRepository;
import com.neatstreets.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final UserDetailsService userDetailsService;

    public UserService(UserRepository userRepository, UserDetailsService userDetailsService,PostRepository postRepository){
        this.userRepository = userRepository;
        this.userDetailsService = userDetailsService;
        this.postRepository = postRepository;
    }

    public ResponseEntity<UserDto> getCurrentUser(Authentication authentication){
        if (authentication != null && authentication.isAuthenticated()) {
            User authenticatedUser = (User) authentication.getPrincipal();
            Optional<User> userOptional = userRepository.findById(authenticatedUser.getId());

            if (userOptional.isPresent() && userOptional.get().getId().equals(authenticatedUser.getId())) {
                User user = userOptional.get();
                UserDto userDto = new UserDto(
                        user.getId(),
                        user.getRealUsername(),
                        user.getEmail(),
                        user.getRole(),
                        user.getFullname()
                );

                return ResponseEntity.ok(userDto);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    public ResponseEntity<List<Post>> getUserPosts(UUID userId){
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            List<Post> posts = postRepository.findPostsByReportedByOrderByReportedAtDesc(user.get()).orElseThrow();
            return ResponseEntity.ok(posts);
        } else {

            throw new Error("User with id " + userId + " not found");
        }
    }
}
