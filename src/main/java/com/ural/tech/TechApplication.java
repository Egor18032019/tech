package com.ural.tech;

import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Metrics;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.context.annotation.Bean;

import java.util.Optional;

@SpringBootApplication
public class TechApplication {

    public static void main(String[] args) {
        SpringApplication.run(TechApplication.class, args);
    }

    @Bean
    @ConditionalOnClass(name = "io.opentelemetry.javaagent.OpenTelemetryAgent")
    public MeterRegistry otelRegistry() {
        Optional<MeterRegistry> otelRegistry = Metrics.globalRegistry.getRegistries().stream()
                .filter(r -> r.getClass().getName().contains("OpenTelemetryMeterRegistry"))
                .findAny();
        otelRegistry.ifPresent(Metrics.globalRegistry::remove);
        return otelRegistry.orElse(null);
    }
//    @Bean
//    public CommandLineRunner start(FileUploadConfiguration fileUploadConfiguration) {
//        return (args) -> {
//            fileUploadConfiguration.run();
//        };
//    }


//    @Bean
//    public CommandLineRunner demo(PointsRepository repository) {
//        return (args) -> {
//            // save a few customers
//            repository.save(new Points("Chloe", "O'Brian","description"));
//            repository.save(new Points("Kim", "Bauer","description"));
//            repository.save(new Points("David", "Palmer","description"));
//            repository.save(new Points("Michelle", "Dessler","description"));
//
//        };
//    }
}
