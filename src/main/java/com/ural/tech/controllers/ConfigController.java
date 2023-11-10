package com.ural.tech.controllers;

import com.ural.tech.schemas.ConfigResponse;
import com.ural.tech.utils.EndPoint;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Создание и обработка заявок.(изменение)")
@RestController
@RequestMapping(EndPoint.api)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ConfigController {

    private Environment env;

    public ConfigController(Environment env) {
        this.env = env;
    }

    @Operation(
            summary = "Получение версии",
            description = "Выдает версию "
    )
    @GetMapping(value = EndPoint.config)
    public ConfigResponse getConfigFront() {
        String version = env.getProperty("egor.app.version");

        return new ConfigResponse(version );
    }
}
