package com.neatstreets.backend.dtos;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ImageDto {
    private String name;
    private MultipartFile file;
}
