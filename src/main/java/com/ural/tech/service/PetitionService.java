package com.ural.tech.service;

import com.ural.tech.store.Petition;
import com.ural.tech.store.PetitionRepository;
import com.ural.tech.utils.Status;
import org.springframework.stereotype.Service;

import java.nio.file.Path;

@Service()
public class PetitionService {
    PetitionRepository petitionRepository;

    public PetitionService(PetitionRepository petitionRepository) {
        this.petitionRepository = petitionRepository;
    }

    public Petition savePetition(Status status, String description, Path pathToImage) {
        Petition petition = new Petition(status.getStatus(), description, pathToImage.toString());
        return petitionRepository.save(petition);
    }

    public Petition savePetition(Status status, String description) {
        Petition petition = new Petition(status.getStatus(), description);
        return petitionRepository.save(petition);
    }
}
