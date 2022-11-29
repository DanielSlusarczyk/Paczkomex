package pamiw.paczkomex.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pamiw.paczkomex.entities.Locker;
import pamiw.paczkomex.services.LockerService;
import pamiw.paczkomex.services.PackageService;

import java.util.Collection;

@Slf4j
@RestController
@RequestMapping(value = "locker")
@RequiredArgsConstructor
public class LockerController {
    private final LockerService service;
    private final PackageService packageService;

    @GetMapping
    Collection<Locker> findAll() {
        log.debug("Find all lockers");
        return service.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    Locker create(@RequestBody Locker locker) {
        log.debug("Create locker: {}", locker);
        return service.save(locker);
    }

    @GetMapping("/{id}")
    Locker findById(@PathVariable Long id) {
        log.debug("Find locker with id: {}", id);
        return service.findById(id);
    }

    @GetMapping("/load/{id}")
    int getLoadOfLocker(@PathVariable Long id) {
        log.debug("Load of locker with id: {}", id);
        return packageService.countPackagesToLocker(id) + packageService.countPackagesFromLocker(id);
    }
}