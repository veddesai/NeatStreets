package com.neatstreets.backend.dtos;

import com.neatstreets.backend.enums.Role;
import com.neatstreets.backend.model.Post;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPostsDto {

    private UUID id;
    private String username;
    private String email;
    private Role role;
    private String fullname;
    private List<Post> reportedPosts;
}
