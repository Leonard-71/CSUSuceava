package Cyberrules.demo.security.impl;

import Cyberrules.demo.model.Role;
import Cyberrules.demo.model.User;
import Cyberrules.demo.payload.UserDetailsModificationRequest;
import Cyberrules.demo.payload.UserWithSelectedFieldsDTO;
import Cyberrules.demo.repository.RoleRepository;
import Cyberrules.demo.repository.UserRepository;
import Cyberrules.demo.security.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserDetailsService, UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with username: "+ username));
    }

    @Override
    public UserDetailsService userDetailsService() {
        return this;
    }

    @Override
    public List<UserWithSelectedFieldsDTO> getAllUsers() {
        return userRepository.findAllUsers();
    }

    @Override
    public UserWithSelectedFieldsDTO getUser(String username) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if(optionalUser.isPresent())
        {
            User user = optionalUser.get();
            Role role = user.getRoles().iterator().next();
            return new UserWithSelectedFieldsDTO(username,user.getNume(),user.getPrenume(),role);
        }
        return null;
    }

    @Override
    public UserWithSelectedFieldsDTO getLoggedInUserDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            String loggedInUsername = authentication.getName();
            Optional<User> optionalUser = userRepository.findByUsername(loggedInUsername);

            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                Role role = user.getRoles().iterator().next();

                return new UserWithSelectedFieldsDTO(loggedInUsername, user.getNume(), user.getPrenume(), role);
            }
        }
        return null;
    }
    @Override
    public void modifyUserDetails(String username, UserDetailsModificationRequest userDetailsModificationRequest) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (userDetailsModificationRequest.getNume() != null) {
                user.setNume(userDetailsModificationRequest.getNume());
            }
            if (userDetailsModificationRequest.getPrenume() != null) {
                user.setPrenume(userDetailsModificationRequest.getPrenume());
            }
            if (userDetailsModificationRequest.getPassword() != null) {
                user.setPassword(userDetailsModificationRequest.getPassword());
            }
            if(userDetailsModificationRequest.getRol() != null){
                String roleName = userDetailsModificationRequest.getRol();
                Role role = roleRepository.findByName(roleName)
                        .orElseThrow(() -> new RuntimeException("Role not found: " + roleName));

                Set<Role> userRoles = new HashSet<>();
                userRoles.add(role);

                user.setRoles(userRoles);
            }
            userRepository.save(user);
        }
    }
    @Override
    @Transactional
    public void deleteUser(String username) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            Set<Role> roles = user.getRoles();
            user.getRoles().clear();
            userRepository.save(user);

            // Delete the user roles from the join table
            for (Role role : roles) {
                userRepository.removeUserFromRole(username, role.getId());
            }
            // Delete the user
            userRepository.deleteUserByUsername(username);
        }
    }
}
