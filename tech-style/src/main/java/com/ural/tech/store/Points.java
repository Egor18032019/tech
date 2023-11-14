package com.ural.tech.store;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "status")
@Getter
@Setter
public class Points {

    public static final int START_SEQ = 10;
    @Id
    @SequenceGenerator(name = "global_seq", sequenceName = "global_seq", allocationSize = 1, initialValue = START_SEQ)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "global_seq")
    @Column(name = "point_id")
    Long id;
    @Column()
    String status;
    @Column()
    String pointCoordinates;
    @Column()
    String description;
    @Column()
    String urlImage;

    //todo сылка на файл в виде строки

    @Column()
    Instant createdAt = Instant.now();

    public Points() {
    }

    public Points(String status, String pointCoordinates, String description) {
        this.status = status;
        this.pointCoordinates = pointCoordinates;
        this.description = description;
    }

    public Points(String status, String pointCoordinates, String description, String urlImage) {
        this.status = status;
        this.pointCoordinates = pointCoordinates;
        this.description = description;
        this.urlImage = urlImage;
    }
}
