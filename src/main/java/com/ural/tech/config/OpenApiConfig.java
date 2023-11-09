package com.ural.tech.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
//todo
@OpenAPIDefinition(
        info = @Info(
                title = "Beautiful Code Api",
                description = "Beautiful Code(At least I hope it is :-))", version = "0.0.1",
                contact = @Contact(
                        name = "Егор",
                        email = "goro4@mail.ru"
                )
        )
)
public class OpenApiConfig {
}
