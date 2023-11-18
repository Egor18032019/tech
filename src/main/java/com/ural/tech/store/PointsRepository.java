package com.ural.tech.store;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PointsRepository extends JpaRepository<Points, Long> {

    void deleteById(Long id);

    List<Points> findAll();

}
