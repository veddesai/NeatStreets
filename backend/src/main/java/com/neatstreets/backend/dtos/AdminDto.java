package com.neatstreets.backend.dtos;

import com.neatstreets.backend.enums.Role;
import com.neatstreets.backend.model.Post;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminDto extends UserDto{

    private List<Post> reportedPosts;
    private List<Post> assignedPosts;

    public AdminDto(UUID id, String realUsername, String email, Role role, String fullname, List<Post> reportedPosts, List<Post> assignedPosts){
        super(id, realUsername, email, role, fullname);
        this.reportedPosts = reportedPosts;
        this.assignedPosts = assignedPosts;
    }
}
