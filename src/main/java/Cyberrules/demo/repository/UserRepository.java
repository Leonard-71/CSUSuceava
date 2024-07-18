package Cyberrules.demo.repository;

import Cyberrules.demo.model.Role;
import Cyberrules.demo.model.User;
import Cyberrules.demo.payload.UserWithSelectedFieldsDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    @Query("SELECT new Cyberrules.demo.payload.UserWithSelectedFieldsDTO(u.username, u.Nume, u.Prenume, r) FROM User u JOIN u.roles r")
    List<UserWithSelectedFieldsDTO> findAllUsers();
    @Modifying
    @Query("DELETE FROM UserRole ur WHERE ur.username = :username AND ur.role_id = :role_id")
    void removeUserFromRole(@Param("username") String username, @Param("role_id") long role_id);
    @Modifying
    @Query("DELETE FROM User u WHERE u.username = :username")
    void deleteUserByUsername(@Param("username") String username);
    Boolean existsByUsername(String username);
}
