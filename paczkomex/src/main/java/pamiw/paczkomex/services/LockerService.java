package pamiw.paczkomex.services;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import pamiw.paczkomex.entities.Locker;
import pamiw.paczkomex.repositories.LockerRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LockerService {
    private final LockerRepository repo;

    public List<Locker> findAll(){
        return repo.findAll();
    }

    public Locker save(Locker locker){
        if(locker.getId() != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Provide locker without id");
        }

        return repo.save(locker);
    }

    public Locker findById(Long id) {
        return repo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Parcel Not Found"));
    }
}