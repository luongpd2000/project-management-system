package com.projectmanager.service;

import com.projectmanager.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService, GeneralService<User> {
    //User createUser(User u);
    User findByUsername(String username);
    Page findByCreateUser(Long id, Pageable pageable);
    //List<User> findAll();
}
