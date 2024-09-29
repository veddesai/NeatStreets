package com.neatstreets.backend.controller;

import com.neatstreets.backend.dtos.PostDto;

import com.neatstreets.backend.service.ImageService;
import com.neatstreets.backend.service.PostService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/posts")
public class PostController {

    private final PostService postService;

    public PostController(  PostService postService){
        this.postService = postService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createPost(@RequestBody PostDto postDto) {
        return postService.createPost(postDto);
    }


}
