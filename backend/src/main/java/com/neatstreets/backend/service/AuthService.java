package com.neatstreets.backend.service;

import com.neatstreets.backend.dtos.SigninDto;
import com.neatstreets.backend.dtos.SignupDto;
import com.neatstreets.backend.model.User;
import com.neatstreets.backend.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Random;

@Service
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final MailService mailService;
    private final OTPService otpService;
    public AuthService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder, JwtService jwtService, MailService mailService, OTPService otpService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.mailService = mailService;
        this.otpService = otpService;
    }


    public ResponseEntity<?> verify(SignupDto signupDto) throws MessagingException {

        if(userRepository.findByEmail(signupDto.getEmail()).isPresent() || userRepository.findByUsername(signupDto.getUsername()).isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message","Username or email already exists"));
        }

        String otp = String.valueOf(new Random().nextInt(999999));
        otpService.saveOTP(signupDto.getEmail(), otp);

        // Send the OTP to the user's email
        mailService.sendOtpEmail(signupDto.getEmail(), otp);


        return ResponseEntity.ok(Map.of("message", "OTP sent to your email."));
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

        userRepository.save(user);
        otpService.removeOTP(signupDto.getEmail());

        return ResponseEntity.ok(Map.of("message", "Account created successfully."));
    }

    public ResponseEntity<?> signin(SigninDto signinDto, HttpServletResponse response){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signinDto.getEmail(),signinDto.getPassword()));

        User authenticatedUser = userRepository.findByEmail(signinDto.getEmail()).orElseThrow();

        String jwtToken = jwtService.generateToken(authenticatedUser);
        Cookie cookie = new Cookie("JWT", jwtToken);
        cookie.setHttpOnly(true);
//        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge((int) (jwtService.getExpirationTime() / 1000));
        response.addCookie(cookie);

        return ResponseEntity.ok(Map.of("login","successful"));
    }

    public ResponseEntity<?> logout(HttpServletResponse response){
        Cookie cookie = new Cookie("JWT", null);
        cookie.setHttpOnly(true);
//        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        return ResponseEntity.ok("Logged out successfully");
    }

}
