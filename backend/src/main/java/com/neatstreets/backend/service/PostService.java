package com.neatstreets.backend.service;

import com.neatstreets.backend.dtos.PostDto;
import com.neatstreets.backend.model.Post;
import com.neatstreets.backend.model.User;
import com.neatstreets.backend.repository.PostRepository;
import com.neatstreets.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

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
        return ResponseEntity.status(HttpStatus.CREATED).body(post);
    }
}
