package com.ural.tech.schemas;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Ответ API включает в себя Список всех обращений, лимит и офсет")
public class AllPetitionResponse {
    @Schema(description = "Список всех обращений.")
    private List<PetitionResponse> petitionList;
    @Schema(description = "Сколько всего новостей надо.")
    private Integer limit;
    @Schema(description = "С какого новостей считать.")
    private Integer offset;
}
