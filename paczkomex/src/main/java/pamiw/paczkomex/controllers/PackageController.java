package pamiw.paczkomex.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import pamiw.paczkomex.entities.Package;
import pamiw.paczkomex.services.PackageService;

import java.util.Collection;

@Slf4j
@RestController
@RequestMapping(value = "package",
        consumes = MediaType.APPLICATION_JSON_VALUE,
        produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class PackageController {
    private final PackageService service;

    @GetMapping
    Collection<Package> findAll() {
        log.debug("Find all parcels");
        return service.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    Package create(@RequestBody Package pack) {
        log.debug("Create parcel: {}", pack);
        return service.save(pack);
    }

    @GetMapping("/{id}")
    Package findById(@PathVariable Long id) {
        log.debug("Find parcel with id: {}", id);
        return service.findById(id);
    }

    @PutMapping("/{id}")
    Package update(@PathVariable Long id, @RequestBody Package pack) {
        log.debug("Update parcel with id: {}, with parcel {}", id, pack);
        return service.update(id, pack);
    }

    @DeleteMapping("/{id}")
    void deleteEmployee(@PathVariable Long id) {
        log.debug("Delete parcel with id: {}", id);
        service.deleteById(id);
    }
}
