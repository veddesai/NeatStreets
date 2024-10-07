package com.neatstreets.backend.dtos;

import com.fasterxml.jackson.databind.annotation.EnumNaming;
import com.neatstreets.backend.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignupDto {
    private String username;
    private String fullname;
    private String email;
    private String password;
    private Role role;
    private int points;
}
