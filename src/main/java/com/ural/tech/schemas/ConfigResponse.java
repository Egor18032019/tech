package com.ural.tech.schemas;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "отдает номер версии")
public class ConfigResponse {
    @Schema(description = "номер версии")
    String version; // "0.0.1"
}
