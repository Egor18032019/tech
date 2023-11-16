package com.ural.tech;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TechApplication {

    public static void main(String[] args) {
        SpringApplication.run(TechApplication.class, args);
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
