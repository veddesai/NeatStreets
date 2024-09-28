package com.neatstreets.backend.service;

import com.neatstreets.backend.dtos.PostDto;
import com.neatstreets.backend.model.Post;
import com.neatstreets.backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    public Post savePost(Post post){
        Post savedPost = postRepository.save(post);
        return savedPost;
    }
}
