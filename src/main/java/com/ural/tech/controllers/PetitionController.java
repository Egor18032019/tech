package com.ural.tech.controllers;

import com.ural.tech.schemas.AllPetitionResponse;
import com.ural.tech.schemas.NewsResponse;
import com.ural.tech.schemas.PetitionResponse;
import com.ural.tech.service.FileStorageService;
import com.ural.tech.service.PetitionService;
import com.ural.tech.store.Petition;
import com.ural.tech.utils.EndPoint;
import com.ural.tech.utils.Status;
import io.micrometer.core.instrument.MeterRegistry;
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

@Tag(name = "Создание и обработка обращений.(изменение)")
@RestController
@RequestMapping(EndPoint.api + EndPoint.petition)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PetitionController {
    PetitionService petitionService;
    FileStorageService fileStorageService;
    MeterRegistry registry;
    public PetitionController(PetitionService petitionService, FileStorageService fileStorageService, MeterRegistry registry) {
        this.petitionService = petitionService;
        this.fileStorageService = fileStorageService;
        this.registry = registry;
    }
    public static final Logger LOGGER = LoggerFactory.getLogger(PetitionController.class);

    static {
        LOGGER.info("Petition Controller start time:" + LocalTime.now());
    }
    @Operation(
            summary = "Создание обращения",
            description = "Получение данных для создание обращения. Ждет на вход тема, описание проблемы и опционально фото"
    )
    @PostMapping(value = EndPoint.great)
    @CrossOrigin(allowCredentials = "true", originPatterns = "*")
    public PetitionResponse handleFileUpload(
            @RequestParam("topic") String topic,
            @RequestParam("pointCoordinates") String pointCoordinates,
            @RequestParam("description") String description,
                                             @RequestParam(value = "file", required = false) MultipartFile file) {
        Status status = Status.GREAT;
        registry.counter("petition.total", "petition", "create").increment();
        Petition petitionFromBD;
        if (file != null && !file.isEmpty()) {
            LOGGER.info("Сохранение файла");
            Path pathToImage = fileStorageService.save(file);
            LOGGER.info("Сохранение обращения в БД если есть картинка");
            petitionFromBD = petitionService.savePetition(status,topic, description,pointCoordinates, pathToImage);
        } else {
            LOGGER.info("Сохранение обращения в БД без картинки");
            petitionFromBD = petitionService.savePetition(status,topic, description);
        }

        return new PetitionResponse(petitionFromBD.getId(), status.toString(), petitionFromBD.getDescription(),petitionFromBD.getPointCoordinates(), petitionFromBD.getCreatedAt(), petitionFromBD.getUrlImage());

    }

    @Operation(
            summary = "Запрос на получение всех обращений",
            description = "опционально лимит сколько всего обращений и офсет с какого обращения"

    )
    @GetMapping(value = EndPoint.all)
    @CrossOrigin(allowCredentials = "true", originPatterns = "*")
    public AllPetitionResponse allPointResponse(@Parameter(schema = @Schema(implementation = AllPetitionResponse.class))
                                                @RequestParam(value = "limit", required = false) Optional<Integer> limit,
                                                @RequestParam(value = "offset", required = false) Optional<Integer> offset) {

        return petitionService.getAllPetitionForResponse(limit, offset);
    }

    @Operation(
            summary = "Запрос на удаление одного обращения",
            description = "На вход ждет id обращения"
    )
    @DeleteMapping(value = {"{id}"})
    @CrossOrigin(allowCredentials = "true", originPatterns = "*")
    public NewsResponse deletePoint(@PathVariable String id) {
        registry.counter("petition.total", "petition", "delete").increment();
        petitionService.delete(id);
        return new NewsResponse();
    }

}

