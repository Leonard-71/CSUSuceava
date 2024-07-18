package Cyberrules.demo.payload;

import lombok.Data;

@Data
public class SignUpDto {
    private String nume;
    private String prenume;
    private String username;
    private String password;
}
