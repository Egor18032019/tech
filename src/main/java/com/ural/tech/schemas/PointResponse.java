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
@Schema(description = "Ответ API включает в себя статус обращения,координаты,описание проблемы, дата создания обращения и имя файла")
public class PointResponse {
    @Schema(description = "id из бд")
    Long id;
    @Schema(description = "статус обращения")
    String status;
    @Schema(description = "координаты в формате 60.497874,56.926760 ")
    String[] coordinates; //point: [56.800584, 60.675637]}
    @Schema(description = "Описание проблемы")
    String description; // "яма на дороге"
    @Schema(description = "Время создание обращение")
    Instant dateComplete; //
    @Schema(description = "имя файла сохраненного на сервере")
    String pathToImage; //
}
