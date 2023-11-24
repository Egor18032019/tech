package com.ural.tech.store;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PetitionRepository extends JpaRepository<Petition, Long> {

    void deleteById(Long id);

    List<Petition> findAll();
}
