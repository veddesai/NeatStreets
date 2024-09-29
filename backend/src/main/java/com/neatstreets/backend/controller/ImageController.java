package com.neatstreets.backend.controller;

import com.neatstreets.backend.dtos.ImageDto;
import com.neatstreets.backend.repository.ImageRepository;
import com.neatstreets.backend.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/")
public class ImageController {

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ImageService imageService;

    @PostMapping("/upload")
    public ResponseEntity<Map<String,String>> upload(ImageDto imageModel) {
        try {
            return imageService.uploadImage(imageModel);
        } catch (Exception e) {
           throw new Error(e);
        }
    }
}
