package pamiw.paczkomex.services;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import pamiw.paczkomex.entities.Package;
import pamiw.paczkomex.repositories.PackageRepository;

import java.util.Collection;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class PackageService {
    private final PackageRepository repo;

    public Collection<Package> findAll(){
        return repo.findAll();
    }

    public Package save(Package pack){
        if(pack.getId() != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Provide parcel without id");
        }

        return repo.save(pack);
    }

    public Package findById(Long id) {
        return repo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Parcel Not Found"));
    }

    public Package update(Long id, Package pack) {
        if(!Objects.equals(id, pack.getId())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Id and parcel.getId() is not equal");
        }
        return repo.save(pack);
    }

    public void deleteById(Long id) {
        repo.deleteById(id);
    }
}
