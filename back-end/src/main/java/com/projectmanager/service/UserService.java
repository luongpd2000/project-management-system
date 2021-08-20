package com.projectmanager.service;

import com.projectmanager.dto.PasswordRecover;
import com.projectmanager.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.Optional;

public interface UserService extends UserDetailsService, GeneralService<User> {

    Optional<User> findByUsername(String username);

    Page<User> findByCreateUser(Integer id, Pageable pageable);
    Optional<List<User>> findAllUsersNotInProject(Integer id);
    Optional<List<User>> findAllUsersInProject(Integer id);

    List<User> findAllByDeleteIsFalse( );
    String passwordRecover(PasswordRecover pr);
}
