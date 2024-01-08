package com.ural.tech.controllers;


import com.ural.tech.service.FileStorageService;
import com.ural.tech.utils.EndPoint;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalTime;

@Tag(name = "Создание и обработка заявок.(изменение)")
@RestController
@RequestMapping(EndPoint.api)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PointController {

    FileStorageService fileStorageService;

    public PointController(  FileStorageService fileStorageService) {

        this.fileStorageService = fileStorageService;
    }
    public static final Logger LOGGER = LoggerFactory.getLogger(PointController.class);

    static {
        LOGGER.info("Test start time:" + LocalTime.now());
    }


    @Operation(
            summary = "Запрос на получение фото по /api/имя файла ",
            description = "На вход ждет имя файла"
    )
    @GetMapping(value = {"{name}"})
    @CrossOrigin(allowCredentials = "true", originPatterns = "*")
    public byte[] getImage(@PathVariable String name) {
        Resource image = fileStorageService.load(name);
        try {
            return image.getContentAsByteArray();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    @Operation(
            summary = "Запрос на получение фото по /api/image/?name=имя файла",
            description = "На вход ждет имя файла"
    )
    @GetMapping(value = EndPoint.image,
            produces = MediaType.IMAGE_JPEG_VALUE)
    @CrossOrigin(allowCredentials = "true", originPatterns = "*")
    public byte[] getImageForFront(@RequestParam String name) {
        Resource image = fileStorageService.load(name);
        try {
            return image.getContentAsByteArray();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }


}
