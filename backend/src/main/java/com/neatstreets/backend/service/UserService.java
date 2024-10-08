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
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PostRepository postRepository;


    public UserService(UserRepository userRepository,PostRepository postRepository){
        this.userRepository = userRepository;

        this.postRepository = postRepository;
    }

    public ResponseEntity<UserDto> getCurrentUser(Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            User authenticatedUser = (User) authentication.getPrincipal();
            Optional<User> userOptional = userRepository.findById(authenticatedUser.getId());

            if (userOptional.isPresent() && userOptional.get().getId().equals(authenticatedUser.getId())) {
                User user = userOptional.get();

                // Convert reportedPosts from Post to PostDto
                List<PostDto> reportedPosts = user.getReportedPosts().stream()
                        .map(post -> mapToPostDto(post))
                        .collect(Collectors.toList());

                // Convert assignedPosts from Post to PostDto
                List<PostDto> assignedPosts = user.getAssignedPosts().stream()
                        .map(post -> mapToPostDto(post))
                        .collect(Collectors.toList());

                // Role-based DTO construction
                if (user.getRole().equals(Role.END_USER)) {
                    EndUserDto userDto = new EndUserDto(
                            user.getId(),
                            user.getRealUsername(),
                            user.getEmail(),
                            user.getRole(),
                            user.getPoints(),
                            user.getFullname(),
                            reportedPosts
                    );
                    return ResponseEntity.ok(userDto);
                } else if (user.getRole().equals(Role.HELPER)) {
                    HelperDto userDto = new HelperDto(
                            user.getId(),
                            user.getRealUsername(),
                            user.getEmail(),
                            user.getRole(),
                            user.getPoints(),
                            user.getFullname(),
                            assignedPosts
                    );
                    return ResponseEntity.ok(userDto);
                } else {
                    AdminDto userDto = new AdminDto(
                            user.getId(),
                            user.getRealUsername(),
                            user.getEmail(),
                            user.getRole(),
                            user.getPoints(),
                            user.getFullname(),
                            reportedPosts,
                            assignedPosts
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
                        post1.getReportedBy().getPoints(),
                        post1.getReportedBy().getFullname()
                );


                UserDto assignedToDto = post1.getAssignedTo() != null ? new UserDto(
                        post1.getAssignedTo().getId(),
                        post1.getAssignedTo().getRealUsername(),
                        post1.getAssignedTo().getEmail(),
                        post1.getAssignedTo().getRole(),
                        post1.getAssignedTo().getPoints(),
                        post1.getAssignedTo().getFullname()
                ) : null;


                PostDto apply = new PostDto(
                        post1.getId(), post1.getDescription(), post1.getImageUrl(), post1.getLat(), post1.getLng(),post1.getAddress(),post1.getReportedAt(),post1.getStatus(),reportedByDto,assignedToDto,post1.getCompletionTime()
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
    private PostDto mapToPostDto(Post post) {
        return new PostDto(
                post.getId(),
                post.getDescription(),
                post.getImageUrl(),
                post.getLat(),
                post.getLng(),
                post.getAddress(),
                post.getReportedAt(),
                post.getStatus(),
                mapToUserDto(post.getReportedBy()), // Mapping User to UserDto
                mapToUserDto(post.getAssignedTo()), // Mapping User to UserDto if present
                post.getCompletionTime()
        );
    }

    private UserDto mapToUserDto(User user) {
        return new UserDto(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                user.getPoints(),
                user.getFullname()
        );
    }




}
