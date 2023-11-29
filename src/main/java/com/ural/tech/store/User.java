package com.ural.tech.store;

import com.ural.tech.store.entity.AbstractBaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Set;
@Getter
@Setter
@Entity
@Table(name = "users")
public class User extends AbstractBaseEntity {


    @Column(name = "email")
    private String email;

    @Column(name = "first_name")
    private String username;

    @Column(name = "password")
    private String password;

    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), uniqueConstraints = {
            @UniqueConstraint(columnNames = {"user_id", "role"}, name = "uk_user_roles")})
    @Column(name = "role")
    @ElementCollection(fetch = FetchType.EAGER)
    @BatchSize(size = 200)
    @JoinColumn(name = "user_id") // https://stackoverflow.com/a/62848296/548473
    @OnDelete(action = OnDeleteAction.CASCADE)
    @OrderBy
    private Set<String> roles;

    public boolean isEnabled() {
        return true;
    }
    public User() {
    }

    public User(String email, String username) {
        this.email = email;
        this.username = username;
    }

    public User(Long id, String email, String username) {
        super(id);
        this.email = email;
        this.username = username;
    }

    public User(Long id, String email, String username, Set<String> roles) {
        super(id);
        this.email = email;
        this.username = username;
        this.roles = roles;
    }
}
