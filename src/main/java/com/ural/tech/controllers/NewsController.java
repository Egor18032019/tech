package com.ural.tech.controllers;

import com.ural.tech.schemas.AllNewsResponse;
import com.ural.tech.schemas.NewsResponse;
import com.ural.tech.schemas.PointResponse;
import com.ural.tech.service.FileStorageService;
import com.ural.tech.service.NewsService;
import com.ural.tech.store.News;
import com.ural.tech.utils.EndPoint;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.Optional;

@Tag(name = "Создание новостей.(изменение)")
@RestController
@RequestMapping(EndPoint.api + EndPoint.news)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NewsController {
    NewsService newsService;
    FileStorageService fileStorageService;

    public NewsController(NewsService newsService, FileStorageService fileStorageService) {
        this.newsService = newsService;
        this.fileStorageService = fileStorageService;
    }

    @Operation(
            summary = "Создание обращения",
            description = "Получение данных для создание обращения. Ждет на вход  описание проблемы и опционально фото"
    )
    @PostMapping(value = EndPoint.great)
    @CrossOrigin(allowCredentials = "true", originPatterns = "*")
    public NewsResponse handleFileUpload(@RequestParam("description") String description,
                                         @RequestParam(value = "file", required = false) MultipartFile file) {

        News news;
        if (file != null && !file.isEmpty()) {

            Path pathToImage = fileStorageService.save(file);
            System.out.println("pathToImage " + pathToImage);
            news = newsService.savePetition(description, pathToImage);
        } else {

            news = newsService.savePetition(description);
        }

        return new NewsResponse(news.getId(), description, news.getCreatedAt(), news.getUrlImage());

    }


    @Operation(
            summary = "Запрос на получение всех новостей",
            description = "опционально лимит сколько всего обращений и офсет с какого обращения"

    )
    @GetMapping(value = EndPoint.allNews)
    @CrossOrigin(allowCredentials = "true", originPatterns = "*")
    public AllNewsResponse allPointResponse(@Parameter(schema = @Schema(implementation = AllNewsResponse.class))
                                            @RequestParam(value = "limit", required = false) Optional<Integer> limit,
                                            @RequestParam(value = "offset", required = false) Optional<Integer> offset) {

        return newsService.getAllNewsForResponse(limit, offset);
    }

    @Operation(
            summary = "Запрос на удаление одной новости",
            description = "На вход ждет id новости"
    )
    @DeleteMapping(value = {"{id}"})
    @CrossOrigin(allowCredentials = "true", originPatterns = "*")
    public NewsResponse deletePoint(@PathVariable String id) {
        newsService.delete(id);
        return new NewsResponse();
    }
}
