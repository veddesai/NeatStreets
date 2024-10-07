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
public class HelperDto extends UserDto{
    private List<Post> assignedPosts;

    public HelperDto(UUID id, String username, String email, Role role,int points,String fullname, List<Post> assignedPosts){
        super(id, username, email, role, points, fullname);
        this.assignedPosts = assignedPosts;
    }
}
