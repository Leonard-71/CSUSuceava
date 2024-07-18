package Cyberrules.demo.controller;

import Cyberrules.demo.model.User;
import Cyberrules.demo.payload.UserDetailsModificationRequest;
import Cyberrules.demo.payload.UserWithSelectedFieldsDTO;
import Cyberrules.demo.security.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class AdminController {
    private final UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<UserWithSelectedFieldsDTO>> getAllUsers() {
        List<UserWithSelectedFieldsDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    @GetMapping("/users/{username}")
    public ResponseEntity<UserWithSelectedFieldsDTO> getUser(@PathVariable String username) {
        UserWithSelectedFieldsDTO user = userService.getUser(username);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/users/{username}")
    public ResponseEntity<String> modifyUserDetails(
            @PathVariable String username,
            @RequestBody UserDetailsModificationRequest userDetailsModificationRequest) {
        userService.modifyUserDetails(username, userDetailsModificationRequest);
        return ResponseEntity.ok("User details modified successfully");
    }

    @DeleteMapping("/users/{username}")
    public ResponseEntity<String> deleteUser(@PathVariable String username) {
        userService.deleteUser(username);
        return ResponseEntity.ok("User deleted successfully");
    }
}
