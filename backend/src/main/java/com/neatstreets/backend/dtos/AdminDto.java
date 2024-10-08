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

    private List<PostDto> reportedPosts;
    private List<PostDto> assignedPosts;

    public AdminDto(UUID id, String realUsername, String email, Role role,int points, String fullname, List<PostDto> reportedPosts, List<PostDto> assignedPosts){
        super(id, realUsername, email, role,points, fullname);
        this.reportedPosts = reportedPosts;
        this.assignedPosts = assignedPosts;
    }
}
