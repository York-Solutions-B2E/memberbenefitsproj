package com.yorksolutions.memberbenefitsprojbe.config;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import org.springframework.stereotype.Service;

@Service
public class MBService {
    private GoogleIdTokenVerifier verifier;

    public String verifyGoogleLogin(String token) throws Exception {
        GoogleIdToken idToken = verifier.verify(token);
        if (idToken != null) {
            GoogleIdToken.Payload payload = idToken.getPayload();
            // Get user information
            String sub = payload.getSubject();
            String email = payload.getEmail();
            String name = (String) payload.get("name");

            // You can now save or retrieve the user from your database using the unique ID (sub)
            System.out.println("Google login successful for email-user: " + email);
            System.out.println("Google login payload subject: " + sub);
            return sub;
        } else {
            throw new Exception("Invalid ID token.");
        }
    }
}
