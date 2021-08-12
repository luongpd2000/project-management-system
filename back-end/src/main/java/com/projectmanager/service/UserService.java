package com.projectmanager.service;

import com.projectmanager.entity.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {
    User createUser(User u);
    User findByUsername(String username);
    List<User> findAll();
}
