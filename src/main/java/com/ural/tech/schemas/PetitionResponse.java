package com.ural.tech.schemas;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Ответ API включает в себя статус обращения, описание проблемы, дата создания обращения и имя файла")
public class PetitionResponse {
    @Schema(description = "id из бд")
    Long id;
    @Schema(description = "статус обращения")
    String status;
    @Schema(description = "Описание проблемы")
    String description; // "яма на дороге"
    @Schema(description = "Время создание/изменения обращение")
    Instant createdAt; //
    @Schema(description = "имя файла сохраненного на сервере")
    String pathToImage; //
}
