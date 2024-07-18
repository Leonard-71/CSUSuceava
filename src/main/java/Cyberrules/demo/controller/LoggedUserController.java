package Cyberrules.demo.controller;

import Cyberrules.demo.payload.UserWithSelectedFieldsDTO;
import Cyberrules.demo.security.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/loggeduser")
@RequiredArgsConstructor
public class LoggedUserController {
    private final UserService userService;

    @GetMapping("/details")
    public ResponseEntity<UserWithSelectedFieldsDTO> getLoggedUserDetails() {
        UserWithSelectedFieldsDTO user = userService.getLoggedInUserDetails();
        return ResponseEntity.ok(user);
    }
}
