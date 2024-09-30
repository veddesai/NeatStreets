package com.neatstreets.backend.dtos;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.neatstreets.backend.enums.PostStatus;
import com.neatstreets.backend.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.experimental.Accessors;
import org.springframework.web.multipart.MultipartFile;

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
    private String location;
    private Date reportedAt;
    private PostStatus status;
    private UserDto reportedBy;
    private UserDto assignedTo;
    private Date completionTime;
}

