package com.ural.tech.controllers;

import com.ural.tech.schemas.AllNewsResponse;
import com.ural.tech.schemas.NewsResponse;
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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.time.LocalTime;
import java.util.Optional;

import io.micrometer.core.instrument.MeterRegistry;

@Tag(name = "Создание новостей.(изменение)")
@RestController
@RequestMapping(EndPoint.api + EndPoint.news)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NewsController {
    NewsService newsService;
    FileStorageService fileStorageService;
    MeterRegistry registry;

    public NewsController(NewsService newsService, FileStorageService fileStorageService, MeterRegistry registry) {
        this.newsService = newsService;
        this.fileStorageService = fileStorageService;
        this.registry = registry;
    }

    public static final Logger LOGGER = LoggerFactory.getLogger(NewsController.class);

    static {
        LOGGER.info("Test start time:" + LocalTime.now());
    }

    @Operation(
            summary = "Создание новости",
            description = "Получение данных для создание новости. Ждет на вход  описание проблемы и опционально фото"
    )
    @PostMapping(value = EndPoint.great)
    @CrossOrigin(allowCredentials = "true", originPatterns = "*")
    public NewsResponse handleFileUpload(
            @RequestParam("description") String description,
            @RequestParam("start") String start,
            @RequestParam("end") String end,

            @RequestParam(value = "file", required = false) MultipartFile file) {
        registry.counter("news.total", "news", "create").increment();
        News news;
        if (file != null && !file.isEmpty()) {
            LOGGER.info("Сохранение файла");
            Path pathToImage = fileStorageService.save(file);
            LOGGER.info("Сохранение новости в БД если есть картинка");
            news = newsService.saveNews(description, pathToImage, start, end);
        } else {
            LOGGER.info("Сохранение новости в БД без картинки");
            news = newsService.saveNews(description, start, end);
        }

        return new NewsResponse(news.getId(), description, news.getBeginning(), news.getFinish(), news.getCreatedAt(), news.getUrlImage());

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
        registry.counter("news.total", "news", "all").increment();
        return newsService.getAllNewsForResponse(limit, offset);
    }

    @Operation(
            summary = "Запрос на удаление одной новости",
            description = "На вход ждет id новости"
    )
    @DeleteMapping(value = {"{id}"})
    @CrossOrigin(allowCredentials = "true", originPatterns = "*")
    public NewsResponse deletePoint(@PathVariable String id) {
        registry.counter("news.total", "news", "delete").increment();
        newsService.delete(id);
        return new NewsResponse();
    }
}
