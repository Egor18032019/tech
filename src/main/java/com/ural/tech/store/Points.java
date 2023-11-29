package com.ural.tech.store;


import com.ural.tech.store.entity.AbstractBaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "status")
@Getter
@Setter
public class Points extends AbstractBaseEntity {
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

    @Override
    public String toString() {
        return "Points{" +
                "id=" + id +
                ", status='" + status + '\'' +
                ", pointCoordinates='" + pointCoordinates + '\'' +
                ", description='" + description + '\'' +
                ", urlImage='" + urlImage + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}
