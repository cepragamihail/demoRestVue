package cepraga.mihail.demoRestVue.repository;

import cepraga.mihail.demoRestVue.domain.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {

}
