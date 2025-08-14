package com.backend.MainProject.Service;

import org.springframework.web.multipart.MultipartFile;

public interface FileServiceImpl {

    String saveFile(String filePath);
    String saveFile(MultipartFile file);

    byte[] loadFile(String hash);
}

