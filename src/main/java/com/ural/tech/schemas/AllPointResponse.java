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
@Schema(description = "Ответ API включает в себя Список всех обращений, лимит и офсет") //TODO ограничение .. в радиусе таком то от переданных координат
public class AllPointResponse {
    @Schema(description = "Список всех обращений.")
    private List<PointResponse> points;
    @Schema(description = "Сколько всего обращений надо.")
    private Integer limit;
    @Schema(description = "С какого обращения считать.")
    private Integer offset;
}
