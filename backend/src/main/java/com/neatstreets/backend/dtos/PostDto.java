package com.neatstreets.backend.dtos;

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
    private String text;
    private Date reportedAt;
    private String status;
    private String reportedBy;
    private Date completionTime;

    private MultipartFile image;

}
