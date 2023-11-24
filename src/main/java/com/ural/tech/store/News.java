package com.ural.tech.store;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "news")
@Getter
@Setter
public class News {

    public static final int START_SEQ = 10;
    @Id
    @SequenceGenerator(name = "global_seq", sequenceName = "global_seq", allocationSize = 1, initialValue = START_SEQ)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "global_seq")
    @Column(name = "news_id")
    Long id;
    @Column()
    String description;
    @Column()
    String urlImage;

    //todo сылка на файл в виде строки

    @Column()
    Instant createdAt = Instant.now();

    public News() {
    }

    public News(String description) {
        this.description = description;
    }

    public News(String description, String urlImage) {
        this.description = description;
        this.urlImage = urlImage;
    }
}
