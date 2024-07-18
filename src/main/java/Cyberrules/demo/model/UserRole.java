package Cyberrules.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "user_roles")
@AllArgsConstructor
public class UserRole {
    @Id
    @Column(name = "username")
    private String username;

    @Id
    @Column(name = "role_id")
    private long role_id;
}
