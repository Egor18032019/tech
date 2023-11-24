package com.ural.tech.store;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NewsRepository extends JpaRepository<News, Long> {
    void deleteById(Long id);

    List<News> findAll();
}
