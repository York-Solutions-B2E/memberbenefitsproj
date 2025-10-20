package com.yorksolutions.memberbenefitsprojbe;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.yorksolutions.memberbenefitsprojbe.entity.User;
import com.yorksolutions.memberbenefitsprojbe.repo.UserRepository;
import io.micrometer.common.lang.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MBService {

//    @Autowired
//    private GoogleIdTokenVerifier verifier;
//    this works too, but not recommend for testing n robustness

//    this is a better way, create and injection to constructor and autowired
    private GoogleIdTokenVerifier verifier;
    private UserRepository userRepository;

    @Autowired
    public MBService(@NonNull GoogleIdTokenVerifier verifier, @NonNull UserRepository userRepository) {
        this.verifier = verifier;
        this.userRepository = userRepository;
    }

    public Page<User> getUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").ascending());
        return userRepository.findAll(pageable);
    }

    public String verifyGoogleLogin(String token) throws Exception {
        GoogleIdToken idToken = verifier.verify(token);
        if (idToken != null) {
            GoogleIdToken.Payload payload = idToken.getPayload();
            // Get user information
            String sub = payload.getSubject();
            String email = payload.getEmail();
            String provider = payload.getIssuer();
//            String name = (String) payload.get("name");

            // You can now save or retrieve the user from your database using the unique ID (sub)
            User user = User.builder()
                    .authProvider(provider)
                    .authSub(sub)
                    .email(email)
                    .build();
//            System.out.println("new user: " + user);

            Optional<User> result = userRepository.findByAuthSub(sub);
            if (result.isEmpty()) {
                userRepository.save(user);
//                System.out.println("user not found new user saved: " + user);
            }
            System.out.println("Google login successful for email-user: " + email);
            System.out.println("Google login payload subject: " + sub);
//            may need to return payload so FE don't need decoding
//            also might need jsonify instead of string for parsing
            return sub;
        } else {
            throw new Exception("Invalid ID token.");
        }
    }
}
