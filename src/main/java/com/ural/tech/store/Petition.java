package com.ural.tech.store;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "petition")
@Getter
@Setter
public class Petition {

    public static final int START_SEQ = 10;
    @Id
    @SequenceGenerator(name = "global_seq", sequenceName = "global_seq", allocationSize = 1, initialValue = START_SEQ)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "global_seq")
    @Column(name = "petition_id")
    Long id;
    @Column()
    String status;
    @Column()
    String topic;
    @Column()
    String description;
    @Column()
    String urlImage;

    //todo сылка на файл в виде строки

    @Column()
    Instant createdAt = Instant.now();

    public Petition() {
    }

    public Petition(String status, String topic, String description) {
        this.status = status;
        this.topic = topic;
        this.description = description;
    }

    public Petition(String status, String topic, String description, String urlImage) {
        this.status = status;
        this.topic = topic;
        this.description = description;
        this.urlImage = urlImage;
    }
}
