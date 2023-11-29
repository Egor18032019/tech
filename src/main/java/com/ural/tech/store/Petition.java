package com.ural.tech.store;

import com.ural.tech.store.entity.AbstractBaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "petition")
@Getter
@Setter
public class Petition extends AbstractBaseEntity {


    @Column()
    String status;
    @Column()
    String topic;
    @Column()
    String description;
    @Column()
    String urlImage;

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
