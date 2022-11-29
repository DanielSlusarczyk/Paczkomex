package pamiw.paczkomex.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pamiw.paczkomex.entities.Locker;

public interface LockerRepository extends JpaRepository<Locker, Long> {
}
