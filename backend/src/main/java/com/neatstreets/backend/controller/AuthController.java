package com.neatstreets.backend.controller;

import com.neatstreets.backend.dtos.SigninDto;
import com.neatstreets.backend.dtos.SignupDto;
import com.neatstreets.backend.model.User;
import com.neatstreets.backend.response.LoginResponse;
import com.neatstreets.backend.service.AuthService;
import com.neatstreets.backend.service.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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
    public ResponseEntity<?> signup(@RequestBody SignupDto signupDto){
        return authService.signup(signupDto);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody SigninDto signinDto,HttpServletResponse response){
        return authService.signin(signinDto,response);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {


        return authService.logout(response);
    }
}
