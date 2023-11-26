package com.ural.tech.controllers;

import com.ural.tech.schemas.AllPetitionResponse;
import com.ural.tech.schemas.PetitionResponse;
import com.ural.tech.service.FileStorageService;
import com.ural.tech.service.PetitionService;
import com.ural.tech.store.Petition;
import com.ural.tech.utils.EndPoint;
import com.ural.tech.utils.Status;
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

@Tag(name = "Создание и обработка обращений.(изменение)")
@RestController
@RequestMapping(EndPoint.api)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PetitionController {
    PetitionService petitionService;
    FileStorageService fileStorageService;

    public PetitionController(PetitionService petitionService, FileStorageService fileStorageService) {
        this.petitionService = petitionService;
        this.fileStorageService = fileStorageService;
    }

    @Operation(
            summary = "Создание обращения",
            description = "Получение данных для создание обращения. Ждет на вход тема, описание проблемы и опционально фото"
    )
    @PostMapping(value = EndPoint.creatPetition)
    @CrossOrigin(allowCredentials = "true", originPatterns = "*")
    public PetitionResponse handleFileUpload(
            @RequestParam("topic") String topic,
            @RequestParam("description") String description,
                                             @RequestParam(value = "file", required = false) MultipartFile file) {
        Status status = Status.GREAT;

        Petition petitionFromBD;
        if (file != null && !file.isEmpty()) {

            Path pathToImage = fileStorageService.save(file);
            System.out.println("pathToImage " + pathToImage);
            petitionFromBD = petitionService.savePetition(status,topic, description, pathToImage);
        } else {

            petitionFromBD = petitionService.savePetition(status,topic, description);
        }

        return new PetitionResponse(petitionFromBD.getId(), status.toString(), petitionFromBD.getDescription(), petitionFromBD.getCreatedAt(), petitionFromBD.getUrlImage());

    }

    @Operation(
            summary = "Запрос на получение всех обращений",
            description = "опционально лимит сколько всего обращений и офсет с какого обращения"

    )
    @GetMapping(value = EndPoint.allPetition)
    @CrossOrigin(allowCredentials = "true", originPatterns = "*")
    public AllPetitionResponse allPointResponse(@Parameter(schema = @Schema(implementation = AllPetitionResponse.class))
                                                @RequestParam(value = "limit", required = false) Optional<Integer> limit,
                                                @RequestParam(value = "offset", required = false) Optional<Integer> offset) {

        return petitionService.getAllPetitionForResponse(limit, offset);
    }

}

