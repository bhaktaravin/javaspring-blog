package com.blog.payload.response;

import java.util.List;

public class UserInfo {
    
    private String id; 
    private String username; 
    private String email; 
    private List<String> roles; 


    public UserInfo(String id, String username, String email, List<String> roles){
        this.id = id; 
        this.username = username; 
        this.email = email;
        this.roles = roles;
    }


    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<String> getRoles() {
        return this.roles;
    }

    
}
