package com.neatstreets.backend.service;


import com.neatstreets.backend.dtos.*;
import com.neatstreets.backend.enums.Role;
import com.neatstreets.backend.model.Post;
import com.neatstreets.backend.model.User;
import com.neatstreets.backend.repository.PostRepository;
import com.neatstreets.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PostRepository postRepository;


    public UserService(UserRepository userRepository,PostRepository postRepository){
        this.userRepository = userRepository;

        this.postRepository = postRepository;
    }

    public ResponseEntity<UserDto> getCurrentUser(Authentication authentication){
        if (authentication != null && authentication.isAuthenticated()) {
            User authenticatedUser = (User) authentication.getPrincipal();
            Optional<User> userOptional = userRepository.findById(authenticatedUser.getId());

            if (userOptional.isPresent() && userOptional.get().getId().equals(authenticatedUser.getId())) {
                User user = userOptional.get();
                if(user.getRole().equals(Role.END_USER)){
                    EndUserDto userDto = new EndUserDto(
                            user.getId(),
                            user.getRealUsername(),
                            user.getEmail(),
                            user.getRole(),
                            user.getFullname(),
                            user.getReportedPosts()
                    );
                    return ResponseEntity.ok(userDto);
                } else if (user.getRole().equals(Role.HELPER)) {
                    HelperDto userDto = new HelperDto(
                            user.getId(),
                            user.getRealUsername(),
                            user.getEmail(),
                            user.getRole(),
                            user.getFullname(),
                            user.getAssignedPosts()
                    );
                    return ResponseEntity.ok(userDto);
                }
                else{
                    AdminDto userDto = new AdminDto(
                            user.getId(),
                            user.getRealUsername(),
                            user.getEmail(),
                            user.getRole(),
                            user.getFullname(),
                            user.getReportedPosts(),
                            user.getAssignedPosts()
                    );
                    return ResponseEntity.ok(userDto);
                }

            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    public ResponseEntity<List<PostDto>> getUserPosts(UUID userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            // Fetch posts reported by the user
            List<Post> posts = postRepository.findPostsByReportedByOrderByReportedAtDesc(user.get())
                    .orElseThrow(() -> new Error("No posts found for user"));


            List<PostDto> postDtos = new ArrayList<>();
            for (Post post1 : posts) {

                UserDto reportedByDto = new UserDto(
                        post1.getReportedBy().getId(),
                        post1.getReportedBy().getRealUsername(),
                        post1.getReportedBy().getEmail(),
                        post1.getReportedBy().getRole(),
                        post1.getReportedBy().getFullname()
                );


                UserDto assignedToDto = post1.getAssignedTo() != null ? new UserDto(
                        post1.getAssignedTo().getId(),
                        post1.getAssignedTo().getRealUsername(),
                        post1.getAssignedTo().getEmail(),
                        post1.getAssignedTo().getRole(),
                        post1.getAssignedTo().getFullname()
                ) : null;


                PostDto apply = new PostDto(
                        post1.getId(), post1.getDescription(), post1.getImageUrl(),post1.getLocation(),post1.getReportedAt(),post1.getStatus(),reportedByDto,assignedToDto,post1.getCompletionTime()
                );
                postDtos.add(apply);
            }

            return ResponseEntity.ok(postDtos);
        } else {
            throw new Error("User with id " + userId + " not found");
        }
    }


    public ResponseEntity<UserDto> getUserById(UUID userId){
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()){
            UserDto userDto = mapToUserDto(user.orElseThrow(()-> new RuntimeException("User Id Wrong")));
            return ResponseEntity.ok(userDto);
        }
        else{
            throw new RuntimeException("User with id " + userId + " not found");
        }
    }

    private UserDto mapToUserDto(User user) {
        return new UserDto(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                user.getFullname()
        );
    }
}
