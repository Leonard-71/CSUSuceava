package Cyberrules.demo.controller;

import Cyberrules.demo.payload.JwtAuthenticationResponse;
import Cyberrules.demo.payload.LoginDto;
import Cyberrules.demo.payload.SignUpDto;
import Cyberrules.demo.security.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(methods = {RequestMethod.POST})
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationService authenticationService;

    @PostMapping("/signin")
    public ResponseEntity<JwtAuthenticationResponse> authenticateUser(@RequestBody LoginDto request){
        return ResponseEntity.ok(authenticationService.signin(request));
    }

    @PostMapping("/signup")
    public ResponseEntity<JwtAuthenticationResponse> registerUser(@RequestBody SignUpDto request){
        return ResponseEntity.ok(authenticationService.signup(request));
    }

//    @PostMapping("/signout")
//    public ResponseEntity<String> signoutUser(HttpServletRequest request) {
//        SecurityContextHolder.clearContext();
//        HttpSession session = request.getSession(false);
//        if (session != null) {
//            session.invalidate();
//        }
//        return new ResponseEntity<>("User signed out successfully!", HttpStatus.OK);
//    }

}
