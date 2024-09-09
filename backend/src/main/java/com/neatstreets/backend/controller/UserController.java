package com.neatstreets.backend.controller;


import com.neatstreets.backend.dtos.UserDto;
import com.neatstreets.backend.model.User;
import com.neatstreets.backend.repository.UserRepository;
import com.neatstreets.backend.service.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.catalina.realm.JNDIRealm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserDetailsService userDetailsService;

    @GetMapping
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    @GetMapping("/profile")
    public ResponseEntity<UserDto> getCurrentUser(Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            User authenticatedUser = (User) authentication.getPrincipal();
            Optional<User> userOptional = userRepository.findById(authenticatedUser.getId());

            if (userOptional.isPresent() && userOptional.get().getId().equals(authenticatedUser.getId())) {
                User user = userOptional.get();
                UserDto userDto = new UserDto(
                        user.getId(),
                        user.getRealUsername(),
                        user.getEmail(),
                        user.getRole(),
                        user.getFullname()
                );

                return ResponseEntity.ok(userDto);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }


}
