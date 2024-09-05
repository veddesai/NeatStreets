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
        User authenticatedUser = authService.signin(signinDto);
        String jwtToken = jwtService.generateToken(authenticatedUser);
        long expirationTime = jwtService.getExpirationTime();
        Cookie cookie = new Cookie("JWT", jwtToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge((int) (jwtService.getExpirationTime() / 1000));
        response.addCookie(cookie);
//        LoginResponse loginResponse = new LoginResponse()
//                .setToken(jwtToken)
//                .setExpiresIn(expirationTime);
        return ResponseEntity.ok(Map.of("login","successful"));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        // Create a cookie with the same name as the one to be removed
        Cookie cookie = new Cookie("JWT", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true); // Set to false if not using HTTPS
        cookie.setPath("/");
        cookie.setMaxAge(0); // Set max age to 0 to delete the cookie

        // Add the cookie to the response
        response.addCookie(cookie);

        return ResponseEntity.ok("Logged out successfully");
    }
}
