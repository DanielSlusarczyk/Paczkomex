package pamiw.paczkomex.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import pamiw.paczkomex.entities.Locker;
import pamiw.paczkomex.entities.Package;
import pamiw.paczkomex.services.LockerService;
import pamiw.paczkomex.services.PackageService;

import java.util.Collection;

@Slf4j
@RestController
@RequestMapping(value = "package")
@RequiredArgsConstructor
public class PackageController {
    private final PackageService service;
    private final LockerService lockerService;

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

    @PutMapping("/{packageId}/to/{lockerId}")
    Package setDestination(
            @PathVariable Long packageId,
            @PathVariable Long lockerId
    ) {
        Locker lock = lockerService.findById(lockerId);
        Package pack = service.findById(packageId);
        log.debug("The package: {}, going to {}", pack, lock);
        pack.setDestLocker(lock);
        return service.update(packageId, pack);
    }

    @PutMapping("/{packageId}/from/{lockerId}")
    Package setSource(
            @PathVariable Long packageId,
            @PathVariable Long lockerId
    ) {
        Locker lock = lockerService.findById(lockerId);
        Package pack = service.findById(packageId);
        log.debug("The package: {}, going from {}", pack, lock);
        pack.setSrcLocker(lock);
        return service.update(packageId, pack);
    }

    @DeleteMapping("/{id}")
    void deleteEmployee(@PathVariable Long id) {
        log.debug("Delete parcel with id: {}", id);
        service.deleteById(id);
    }
}