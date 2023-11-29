package com.ural.tech.store;

import com.ural.tech.store.entity.AbstractBaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "news")
@Getter
@Setter
public class News extends AbstractBaseEntity {

    @Column()
    String description;
    @Column()
    String urlImage;
    @Column()
    String beginning;
    @Column()
    String finish;

    @Column()
    Instant createdAt = Instant.now();

    public News() {
    }

    public News(String description, String start, String end) {
        this.description = description;
        this.beginning = start;
        this.finish = end;
    }

    public News(String description, String urlImage, String start, String end) {
        this.description = description;
        this.urlImage = urlImage;
        this.beginning = start;
        this.finish = end;
    }
}
