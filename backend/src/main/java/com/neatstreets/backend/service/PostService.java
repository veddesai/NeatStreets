package com.neatstreets.backend.service;

import com.neatstreets.backend.dtos.PostDto;
import com.neatstreets.backend.dtos.UserDto;
import com.neatstreets.backend.model.Post;
import com.neatstreets.backend.model.User;
import com.neatstreets.backend.repository.PostRepository;
import com.neatstreets.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public PostService(PostRepository postRepository, UserRepository userRepository){
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    public ResponseEntity<?> createPost(@RequestBody PostDto postDto) {
        Optional<User> reportedByUser = userRepository.findById(postDto.getReportedBy().getId());

        if (reportedByUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Reported By User does not exist.");
        }


        Post post = new Post()
                .setDescription(postDto.getDescription())
                .setLocation(postDto.getLocation())
                .setReportedAt(postDto.getReportedAt())
                .setStatus(postDto.getStatus()).setImageUrl(postDto.getImageUrl())
                .setReportedBy(reportedByUser.get())
                .setCompletionTime(postDto.getCompletionTime());

        postRepository.save(post);
        PostDto postDtos = new PostDto(post.getId(),post.getDescription(),post.getImageUrl(),post.getLocation(),post.getReportedAt(),post.getStatus(),postDto.getReportedBy(),postDto.getAssignedTo(),post.getCompletionTime());
        return ResponseEntity.status(HttpStatus.CREATED).body(postDtos);
    }

    public ResponseEntity<List<PostDto>> getPostsByLocation(String location) {
        List<Post> posts = postRepository.findByLocationOrderByReportedAtDesc(location)
                .orElseThrow(() -> new RuntimeException("Cannot find Posts in your location"));

        List<PostDto> postDtos = posts.stream()
                .map(this::convertToPostDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(postDtos);
    }


    private PostDto convertToPostDto(Post post) {

        UserDto reportedByDto = new UserDto(
                post.getReportedBy().getId(),
                post.getReportedBy().getRealUsername(),
                post.getReportedBy().getEmail(),
                post.getReportedBy().getRole(),
                post.getReportedBy().getFullname()
        );

        UserDto assignedToDto = post.getAssignedTo() != null ? new UserDto(
                post.getAssignedTo().getId(),
                post.getAssignedTo().getRealUsername(),
                post.getAssignedTo().getEmail(),
                post.getAssignedTo().getRole(),
                post.getAssignedTo().getFullname()
        ) : null;


        return new PostDto()
                .setId(post.getId())
                .setImageUrl(post.getImageUrl())
                .setDescription(post.getDescription())
                .setReportedAt(post.getReportedAt())
                .setStatus(post.getStatus())
                .setReportedBy(reportedByDto)
                .setAssignedTo(assignedToDto)
                .setCompletionTime(post.getCompletionTime());
    }



}
