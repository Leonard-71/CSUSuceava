package Cyberrules.demo.security.impl;

import Cyberrules.demo.model.Role;
import Cyberrules.demo.model.User;
import Cyberrules.demo.payload.JwtAuthenticationResponse;
import Cyberrules.demo.payload.LoginDto;
import Cyberrules.demo.payload.SignUpDto;
import Cyberrules.demo.repository.RoleRepository;
import Cyberrules.demo.repository.UserRepository;
import Cyberrules.demo.security.AuthenticationService;
import Cyberrules.demo.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final RoleRepository roleRepository;
    @Override
    public JwtAuthenticationResponse signup(SignUpDto request) {
        Set<Role> roles = new HashSet<>();
        Role role = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("Role not found"));
        roles.add(role);

        User user = User.builder()
                .Prenume(request.getPrenume())
                .Nume(request.getNume())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(roles)
                .build();

        userRepository.save(user);

        var jwt = jwtService.generateToken(user);
        return JwtAuthenticationResponse.builder().token(jwt).build();
    }
    @Override
    public JwtAuthenticationResponse signin(LoginDto request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        var user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("Invalid username or password."));
        var jwt = jwtService.generateToken(user);
        return JwtAuthenticationResponse.builder().token(jwt).build();
    }
}
