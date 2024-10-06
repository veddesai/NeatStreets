package com.neatstreets.backend.dtos;

import com.neatstreets.backend.enums.PostStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import java.util.Date;
import java.util.UUID;

@Data
@Accessors(chain = true)
@NoArgsConstructor
@AllArgsConstructor
public class PostDto {
    private UUID id;
    private String description;
    private String imageUrl;
    private double lat;
    private double lng;
    private String address;
    private Date reportedAt;
    private PostStatus status;
    private UserDto reportedBy;
    private UserDto assignedTo;
    private Date completionTime;
}

