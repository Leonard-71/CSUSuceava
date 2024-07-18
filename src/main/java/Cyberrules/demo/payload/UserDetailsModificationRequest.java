package Cyberrules.demo.payload;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@RequiredArgsConstructor
public class UserDetailsModificationRequest {
    private String nume;
    private String prenume;
    private String password;
    private String rol;
}
