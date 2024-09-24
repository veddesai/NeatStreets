package com.neatstreets.backend.controller;

import com.neatstreets.backend.model.Post;
import com.neatstreets.backend.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/posts")
public class PostController {
    @GetMapping
    public ResponseEntity<List<Post>> getPostsByUser(User user){
        return null;
        //I was Here!!!
    }
}
