package com.neatstreets.backend.service;

import com.neatstreets.backend.dtos.SigninDto;
import com.neatstreets.backend.dtos.SignupDto;
import com.neatstreets.backend.model.User;
import com.neatstreets.backend.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }


    public ResponseEntity<?> signup(SignupDto signupDto){

        if(userRepository.findByEmail(signupDto.getEmail()).isPresent() || userRepository.findByUsername(signupDto.getUsername()).isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message","Username or email already exists"));
        }

        User user = new User()
                .setUsername(signupDto.getUsername())
                .setFullname(signupDto.getFullname())
                .setEmail(signupDto.getEmail())
                .setRole(signupDto.getRole())
                .setPassword(passwordEncoder.encode(signupDto.getPassword()));

        return ResponseEntity.ok(userRepository.save(user));
    }

    public ResponseEntity<?> signin(SigninDto signinDto, HttpServletResponse response){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signinDto.getEmail(),signinDto.getPassword()));

        User authenticatedUser = userRepository.findByEmail(signinDto.getEmail()).orElseThrow();

        String jwtToken = jwtService.generateToken(authenticatedUser);
        Cookie cookie = new Cookie("JWT", jwtToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge((int) (jwtService.getExpirationTime() / 1000));
        response.addCookie(cookie);

        return ResponseEntity.ok(Map.of("login","successful"));
    }

    public ResponseEntity<?> logout(HttpServletResponse response){
        Cookie cookie = new Cookie("JWT", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        return ResponseEntity.ok("Logged out successfully");
    }

}
