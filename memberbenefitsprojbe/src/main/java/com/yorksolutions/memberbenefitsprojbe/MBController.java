package com.yorksolutions.memberbenefitsprojbe;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class MBController {

    private MBService mbService;

    @Autowired
    public MBController(@NonNull MBService mbService) {
        this.mbService = mbService;
    }

    @CrossOrigin
    @PostMapping("/api/auth/google")
    public ResponseEntity<?> googleLogin(@RequestBody String token) {
        try {
            String subject = mbService.verifyGoogleLogin(token);
            // After verification, you can generate your own session/JWT token
            // for the user if you need to maintain a session.
            return ResponseEntity.ok("User authenticated with Google ID: " + subject);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid Google token: " + e.getMessage());
        }
    }

}
