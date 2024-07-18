package Cyberrules.demo.security;

import Cyberrules.demo.model.User;
import Cyberrules.demo.payload.UserDetailsModificationRequest;
import Cyberrules.demo.payload.UserWithSelectedFieldsDTO;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService {
    UserDetailsService userDetailsService();

    List<UserWithSelectedFieldsDTO> getAllUsers();
    UserWithSelectedFieldsDTO getUser(String username);
    UserWithSelectedFieldsDTO getLoggedInUserDetails();

    void modifyUserDetails(String username, UserDetailsModificationRequest userDetailsModificationRequest);

    void deleteUser(String username);
}
