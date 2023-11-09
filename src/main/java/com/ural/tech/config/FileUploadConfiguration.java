package com.ural.tech.config;

import com.ural.tech.service.FileStorageService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * Очистка хранилища и
 * Инициализация хранилища
 */
public class FileUploadConfiguration implements CommandLineRunner {
    FileStorageService fileStorageService;

    public FileUploadConfiguration(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }


    @Override
    public void run(String... args) throws Exception {
        fileStorageService.clear();
        fileStorageService.init();
    }

}
