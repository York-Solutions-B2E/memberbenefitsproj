package com.yorksolutions.memberbenefitsprojbe;

import com.yorksolutions.memberbenefitsprojbe.config.MBService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class MBController {

    private MBService mbService;

    @PostMapping("/api/auth/google")
    public ResponseEntity<?> googleLogin(@RequestBody String token) {
        try {
            System.out.println("string token is: " + token);
            String subject = mbService.verifyGoogleLogin(token);
            // After verification, you can generate your own session/JWT token
            // for the user if you need to maintain a session.
            return ResponseEntity.ok("User authenticated with Google ID: " + subject);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid Google token: " + e.getMessage());
        }
    }

}
