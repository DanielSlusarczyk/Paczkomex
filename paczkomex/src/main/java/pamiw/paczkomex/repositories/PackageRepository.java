package pamiw.paczkomex.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pamiw.paczkomex.entities.Locker;
import pamiw.paczkomex.entities.Package;

import java.util.List;

public interface PackageRepository extends JpaRepository<Package, Long> {
    @Query("FROM Package WHERE destLocker.id = ?1")
    List<Package> findPackagesToLocker(Long destLocker);

    @Query("FROM Package WHERE srcLocker.id = ?1")
    List<Package> findPackagesFromLocker(Long destLocker);
}
