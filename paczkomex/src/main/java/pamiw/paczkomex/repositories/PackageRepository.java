package pamiw.paczkomex.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pamiw.paczkomex.entities.Package;

public interface PackageRepository extends JpaRepository<Package, Long> {}
