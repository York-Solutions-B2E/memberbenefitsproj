package com.yorksolutions.memberbenefitsprojbe;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.yorksolutions.memberbenefitsprojbe.entity.Claim;
import com.yorksolutions.memberbenefitsprojbe.entity.Member;
import com.yorksolutions.memberbenefitsprojbe.entity.User;
import com.yorksolutions.memberbenefitsprojbe.repo.ClaimRepository;
import com.yorksolutions.memberbenefitsprojbe.repo.MemberRepository;
import com.yorksolutions.memberbenefitsprojbe.repo.UserRepository;
import io.micrometer.common.lang.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class MBService {

//    @Autowired
//    private GoogleIdTokenVerifier verifier;
//    this works too, but not recommend for testing n robustness

    //    this is a better way, create and injection to constructor and autowired
    private GoogleIdTokenVerifier verifier;
    private UserRepository userRepository;
    private MemberRepository memberRepository;
    private ClaimRepository claimRepository;

    @Autowired
    public MBService(@NonNull GoogleIdTokenVerifier verifier, @NonNull UserRepository userRepository,
                     @NonNull MemberRepository memberRepository, @NonNull ClaimRepository claimRepository) {
        this.verifier = verifier;
        this.userRepository = userRepository;
        this.memberRepository = memberRepository;
        this.claimRepository = claimRepository;
    }

    public Page<Claim> getSelectedClaimPage(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").ascending());
        return claimRepository.findAll(pageable);
    }

    public User getUser(String authSub) {
        var result = userRepository.findByAuthSub(authSub);
        if (result.isEmpty())
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        return result.get();
    }

    public String verifyGoogleLogin(String token) throws Exception {
        GoogleIdToken idToken = verifier.verify(token);
        if (idToken != null) {
            GoogleIdToken.Payload payload = idToken.getPayload();
            String sub = payload.getSubject();
            String email = payload.getEmail();
            String provider = payload.getIssuer();

            // You can now save or retrieve the user from your database using the unique ID (sub)
            User user = User.builder()
                    .authProvider(provider)
                    .authSub(sub)
                    .email(email)
                    .build();

            Optional<User> result = userRepository.findByAuthSub(sub);
            if (result.isEmpty()) {
                userRepository.save(user);
//                System.out.println("user not found new user saved: " + user);
            }
//            System.out.println("Google login successful for email-user: " + email);
//            System.out.println("Google login payload subject: " + sub);
//            may need to return payload so FE don't need decoding
//            also might need jsonify instead of string for parsing
            return sub;
        } else {
            throw new Exception("Invalid ID token.");
        }
    }

    public Member getMember(UUID memberID) {
        Optional<Member> result = memberRepository.findById(memberID);
        if (result.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        return result.get();
    }

    public List<Claim> getAllClaim() {
        List<Claim> result = claimRepository.findAll();
        if (result.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "no claim found");
        return result;
    }

}
