package com.neatstreets.backend.service;

import com.neatstreets.backend.dtos.SigninDto;
import com.neatstreets.backend.dtos.SignupDto;
import com.neatstreets.backend.model.User;
import com.neatstreets.backend.repository.UserRepository;
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

    public AuthService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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

    public User signin(SigninDto signinDto){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signinDto.getEmail(),signinDto.getPassword()));

        return userRepository.findByEmail(signinDto.getEmail()).orElseThrow();
    }

}
