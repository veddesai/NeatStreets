package com.neatstreets.backend.controller;

import com.neatstreets.backend.dtos.SigninDto;
import com.neatstreets.backend.dtos.SignupDto;
import com.neatstreets.backend.model.User;
import com.neatstreets.backend.repository.UserRepository;
import com.neatstreets.backend.response.LoginResponse;
import com.neatstreets.backend.service.AuthService;
import com.neatstreets.backend.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;

    public AuthController(AuthService authService, JwtService jwtService){
        this.authService = authService;
        this.jwtService = jwtService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody SignupDto signupDto){
        return ResponseEntity.ok(authService.signup(signupDto));
    }

    @PostMapping("/signin")
    public ResponseEntity<LoginResponse> signin(@RequestBody SigninDto signinDto){
        User authenticatedUser = authService.signin(signinDto);
        String jwtToken = jwtService.generateToken(authenticatedUser);


        LoginResponse loginResponse = new LoginResponse().setToken(jwtToken).setExpiresIn(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }
}
