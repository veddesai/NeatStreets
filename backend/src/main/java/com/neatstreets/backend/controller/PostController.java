package com.neatstreets.backend.controller;

import com.neatstreets.backend.dtos.PostDto;
import com.neatstreets.backend.enums.PostStatus;
import com.neatstreets.backend.model.Post;
import com.neatstreets.backend.model.User;
import com.neatstreets.backend.service.CloudinaryService;
import com.neatstreets.backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/posts")
public class PostController {


    private final CloudinaryService cloudinaryService;

    private final PostService postService;

    public PostController(CloudinaryService cloudinaryService, PostService postService){
        this.cloudinaryService = cloudinaryService;
        this.postService = postService;
    }

    @GetMapping

    public ResponseEntity<List<Post>> getPostsByUser(User user){
        return null;
        //I was Here!!!
    }
    @PostMapping("/create")
    public ResponseEntity<Post> createPost(@RequestBody PostDto postDto) throws IOException {
        System.out.println("createPost");
        //403 on this , seems to be problem tmrw back
//        String imgUrl = cloudinaryService.uploadFile(postDto.getImage());
        Post newPost = new Post();
//        newPost.setImageUrl(imgUrl); // Assuming you have an image URL field
        newPost.setDescription(postDto.getText());
        newPost.setReportedAt(postDto.getReportedAt());
        newPost.setReportedBy(postDto.getReportedBy());
        newPost.setStatus(PostStatus.valueOf(postDto.getStatus()));

        Post savedPost = postService.savePost(newPost); // Implement this method in your service
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPost);
    }
}
