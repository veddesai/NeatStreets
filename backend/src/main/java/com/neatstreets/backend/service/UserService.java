package com.neatstreets.backend.service;


import com.neatstreets.backend.dtos.UserDto;
import com.neatstreets.backend.model.User;
import com.neatstreets.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserDetailsService userDetailsService;

    public UserService(UserRepository userRepository, UserDetailsService userDetailsService){
        this.userRepository = userRepository;
        this.userDetailsService = userDetailsService;
    }

    public ResponseEntity<UserDto> getCurrentUser(Authentication authentication){
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
