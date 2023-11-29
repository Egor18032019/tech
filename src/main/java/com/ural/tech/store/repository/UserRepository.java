package com.ural.tech.store.repository;

import com.ural.tech.store.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String name);


}
