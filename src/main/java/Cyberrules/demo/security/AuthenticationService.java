package Cyberrules.demo.security;


import Cyberrules.demo.payload.JwtAuthenticationResponse;
import Cyberrules.demo.payload.LoginDto;
import Cyberrules.demo.payload.SignUpDto;

public interface AuthenticationService {
    JwtAuthenticationResponse signup(SignUpDto request);

    JwtAuthenticationResponse signin(LoginDto request);
}
