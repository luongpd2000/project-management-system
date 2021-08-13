package com.projectmanager.service;

import com.projectmanager.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.Optional;

public interface UserService extends UserDetailsService, GeneralService<User> {

    Optional<User> findByUsername(String username);

    Page<User> findByCreateUser(Long id, Pageable pageable);
}
