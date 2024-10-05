package com.neatstreets.backend.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class OTPService {

    private Map<String, String> otpStore = new HashMap<>();

    public void saveOTP(String email, String otp) {
        otpStore.put(email, otp);
    }

    public boolean verifyOTP(String otp) {

        return otpStore.containsValue(otp);
    }

    public void removeOTP(String email) {
        otpStore.remove(email);
    }
}
