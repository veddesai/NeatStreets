package com.neatstreets.backend.dtos;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.neatstreets.backend.enums.PostStatus;
import com.neatstreets.backend.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostDto {
    private String description;
    private String imageUrl;
    private String location;
    private Date reportedAt;
    private PostStatus status;
    private UserDto reportedBy;
    private UserDto assignedTo;
    private Date completionTime;
}

