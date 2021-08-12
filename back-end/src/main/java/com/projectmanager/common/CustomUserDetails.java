package com.projectmanager.common;

import com.projectmanager.entity.User;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Data
public class CustomUserDetails implements UserDetails {

    private User user;

    public CustomUserDetails(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<GrantedAuthority> authorities = new HashSet<>();
        if(user.getAdmin()){
            System.out.println("admin");
            authorities.add(new SimpleGrantedAuthority("ADMIN"));
        }else {
            System.out.println("user");
            authorities.add(new SimpleGrantedAuthority("USER"));
        }
        //if (authorities.isEmpty()) authorities.add(new SimpleGrantedAuthority("USER"));
        return authorities;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return user.getDelete();
    }

    @Override
    public String toString() {
        return "CustomUserDetails{" +
                "user=" + user +
                '}';
    }
}
