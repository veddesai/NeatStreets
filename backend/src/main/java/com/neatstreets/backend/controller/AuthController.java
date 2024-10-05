package com.neatstreets.backend.controller;

import com.neatstreets.backend.dtos.SigninDto;
import com.neatstreets.backend.dtos.SignupDto;
import com.neatstreets.backend.service.AuthService;
import com.neatstreets.backend.service.JwtService;
import com.neatstreets.backend.service.OTPService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;
    private final OTPService otpService;

    public AuthController(AuthService authService, JwtService jwtService,OTPService otpService){
        this.authService = authService;
        this.jwtService = jwtService;
        this.otpService = otpService;
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verify(@RequestBody SignupDto signupDto) throws MessagingException {
        return authService.verify(signupDto);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupDto signupDto){
        return authService.signup(signupDto);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOTP(@RequestBody Map<String, String> request) {
        String otp = request.get("otp");
        boolean isValid = otpService.verifyOTP(otp);

        if (isValid) {
            return ResponseEntity.ok(Map.of("message", "OTP verified successfully."));
        } else {
            return ResponseEntity.status(400).body(Map.of("message", "Invalid OTP."));
        }
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
