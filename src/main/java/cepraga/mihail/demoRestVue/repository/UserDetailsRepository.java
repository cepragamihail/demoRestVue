package cepraga.mihail.demoRestVue.repository;

import cepraga.mihail.demoRestVue.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserDetailsRepository extends JpaRepository<User, String> {
    Optional<User> findById(String s);
}
