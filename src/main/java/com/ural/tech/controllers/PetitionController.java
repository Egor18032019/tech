package com.ural.tech.controllers;

import com.ural.tech.schemas.PetitionResponse;
import com.ural.tech.schemas.PointRequest;
import com.ural.tech.schemas.PointResponse;
import com.ural.tech.service.FileStorageService;
import com.ural.tech.service.PetitionService;
import com.ural.tech.service.PointService;
import com.ural.tech.store.Petition;
import com.ural.tech.store.Points;
import com.ural.tech.utils.EndPoint;
import com.ural.tech.utils.Status;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;

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
            description = "Получение данных для создание обращения. Ждет на вход  описание проблемы и опционально фото"
    )
    @PostMapping(value = EndPoint.creatPetition)
    @CrossOrigin(allowCredentials = "true", originPatterns = "*")
    public PetitionResponse handleFileUpload(@RequestParam("description") String description,
                                             @RequestParam(value = "file", required = false) MultipartFile file) {
        Status status = Status.GREAT;

        Petition petitionFromBD;
        if (file != null && !file.isEmpty()) {

            Path pathToImage = fileStorageService.save(file);
            System.out.println("pathToImage " + pathToImage);
            petitionFromBD = petitionService.savePetition(status, description, pathToImage);
        } else {

            petitionFromBD = petitionService.savePetition(status, description);
        }

        return new PetitionResponse(petitionFromBD.getId(), status.toString(), petitionFromBD.getDescription(), petitionFromBD.getCreatedAt(), petitionFromBD.getUrlImage());

    }
}
