package com.neatstreets.backend.controller;

import com.neatstreets.backend.dtos.HelperDto;
import com.neatstreets.backend.dtos.PostDto;
import com.neatstreets.backend.service.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService){
        this.postService = postService;
    }

    @GetMapping("/{location}")
    public ResponseEntity<?> getPostsByLocation(@PathVariable String location){
        return postService.getPostsByLocation(location);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createPost(@RequestBody PostDto postDto) {
        return postService.createPost(postDto);
    }

    @PutMapping("/{postId}/assign")
    public ResponseEntity<?> assignToPost(
            @PathVariable UUID postId,
            @RequestBody PostDto assignRequest) {

        return postService.assignToPost(postId,assignRequest);
    }

    @PutMapping("/{postId}/complete")
    public ResponseEntity<?> completePost(@PathVariable UUID postId, @RequestBody PostDto completeRequest){
        return postService.completePost(postId,completeRequest);
    }


}
