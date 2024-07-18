package Cyberrules.demo.payload;

import Cyberrules.demo.model.Role;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class UserWithSelectedFieldsDTO {
    private String username;
    private String nume;
    private String prenume;
    private Role role;

    public UserWithSelectedFieldsDTO(String username, String nume, String prenume, Role role) {
        this.username = username;
        this.nume = nume;
        this.prenume = prenume;
        this.role = role;
    }
}
