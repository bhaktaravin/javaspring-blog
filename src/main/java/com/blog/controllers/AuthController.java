package com.blog.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.models.ERole;
import com.blog.models.Role;
import com.blog.models.User;
import com.blog.payload.request.LoginRequest;
import com.blog.payload.request.SignupRequest;
import com.blog.payload.response.MessageResponse;
import com.blog.payload.response.UserInfo;
import com.blog.repository.RoleRepository;
import com.blog.repository.UserRepository;
import com.blog.security.jwt.JwtUtils;
import com.blog.security.services.UserDetailsImpl;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager; 

    @Autowired
    UserRepository userRepository; 

    @Autowired
    RoleRepository roleRepository; 

    @Autowired
    PasswordEncoder passwordEncoder; 

    @Autowired
    JwtUtils jwtUtils; 

    @PostMapping("/signin") 
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest){

        Authentication authentication = authenticationManager.authenticate( 
            new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        ); 

        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal(); 

        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails); 

        List<String> roles = userDetails.getAuthorities().stream() 
        .map(item -> item.getAuthority()) 
        .collect(Collectors.toList());

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString()) 
        .body(new UserInfo(userDetails.getId(), 
        userDetails.getUsername(), 
        userDetails.getEmail(),
        roles));
    
    }


    @PostMapping("/signup") 
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest){
        if(userRepository.existsByUsername(signupRequest.getUsername())){
            return ResponseEntity
            .badRequest()
            .body(new MessageResponse("Error: Username ios already taken"));
        }
        if(userRepository.existsByEmail(signupRequest.getEmail())) {
            return ResponseEntity
            .badRequest().body(new MessageResponse("Error: Email is already in use"));
        }

        User user = new User(signupRequest.getUsername(), 
        signupRequest.getEmail(), 
        passwordEncoder.encode(signupRequest.getPassword())); 

        Set<String> strRoles = signupRequest.getRoles(); 
        Set<Role> roles = new HashSet<>(); 

        if(strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER) 
            .orElseThrow(() -> new RuntimeException("Error: Role is needed")); 
            roles.add(userRole); 
        
        } else {
            strRoles.forEach(role -> {
              switch (role) {
              case "admin":
                Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(adminRole);
      
                break;
              case "mod":
                Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(modRole);
      
                break;
              default:
                Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(userRole);
              }
            });
          }

          user.setRoles(roles);
          userRepository.save(user); 

          return ResponseEntity.ok(new MessageResponse("User registered successfully")); 
    }
    
}
