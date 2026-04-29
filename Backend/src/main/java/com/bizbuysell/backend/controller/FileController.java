package com.bizbuysell.backend.controller;

import com.bizbuysell.backend.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
public class FileController {

    private final FileStorageService fileStorageService;

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
        String fileUrl = fileStorageService.storeFile(file);
        
        Map<String, String> response = new HashMap<>();
        response.put("url", "http://localhost:8086" + fileUrl);
        response.put("fileName", file.getOriginalFilename());
        
        return ResponseEntity.ok(response);
    }
}
