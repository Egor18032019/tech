package com.ural.tech.service;

import com.ural.tech.schemas.AllPetitionResponse;
import com.ural.tech.schemas.PetitionResponse;
import com.ural.tech.store.Petition;
import com.ural.tech.store.PetitionRepository;
import com.ural.tech.utils.Status;
import org.springframework.stereotype.Service;

import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service()
public class PetitionService {
    PetitionRepository petitionRepository;

    public PetitionService(PetitionRepository petitionRepository) {
        this.petitionRepository = petitionRepository;
    }

    public Petition savePetition(Status status, String topic,String description,String pointCoordinates, Path pathToImage) {
        Petition petition = new Petition(status.getStatus(),topic, description,pointCoordinates, pathToImage.toString());
        return petitionRepository.save(petition);
    }

    public Petition savePetition(Status status,String topic,String description) {
        Petition petition = new Petition(status.getStatus(),topic, description);
        return petitionRepository.save(petition);
    }

    public AllPetitionResponse getAllPetitionForResponse(Optional<Integer> limit, Optional<Integer> offset) {
        List<Petition> list = petitionRepository.findAll();

        int realLimit = list.size();

        if (limit.isPresent()) {
            realLimit = limit.get();
            //todo пользовательские exception ?
            if (realLimit < 1) {
                //todo ("Напиши exception");
                System.out.println("  throw new BadRequestException(\"The limit cannot be less than 1.\");");
                realLimit = list.size();
            }

        }
        if (list.size() < realLimit) {
            realLimit = list.size();
        }

        int realOffset = 0;
        if (offset.isPresent()) {
            realOffset = offset.get();

            if (realOffset > list.size()) {
                realOffset = list.size() - 2;
            }
            if (realOffset <= 0) {
                System.out.println("The offset cannot be less than 0");
//                throw new BadRequestException("The offset cannot be less than 0.");
                realOffset = 0;
            }
        }


        List<PetitionResponse> responses = new ArrayList<>();
        //TODO может из БД лимит и офсет тащить
        for (int i = realOffset; i < realLimit; i++) {
            Petition point = list.get(i);

            PetitionResponse response = new PetitionResponse(point.getId(), point.getStatus(), point.getDescription(),point.getPointCoordinates(), point.getCreatedAt(), point.getUrlImage());
            responses.add(response);
        }

        AllPetitionResponse allPetitionResponse = new AllPetitionResponse(responses, realLimit, realOffset);
        return allPetitionResponse;

    }

}
