package com.projectmanager.service;

import com.projectmanager.dto.PasswordRecover;
import com.projectmanager.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.Optional;

public interface UserService extends UserDetailsService, GeneralService<User> {

    Optional<User> findByUsername(String username);

    Page<User> findByCreateUser(Integer id, Pageable pageable);

    Optional<List<User>> findAllUsersNotInProject(Integer id);

    Optional<List<User>> findAllUsersInProject(Integer id);

    Optional<List<User>> findAllUsersActiveInProject(Integer id);

    Optional<List<User>> findAllUsersDeleteInProject(Integer id);


    Page<User> findAllByDeleteIsFalse(Pageable pageable);

    Page<User> findAllByDeleteIsTrue(Pageable pageable);


    List<User> findAll();

//    List<User> searchUser(String username, String fullName, String email, String address, String phone);
    Page<User> searchUser(String username, String fullName, String email, String address, String phone, Pageable pageable);

    Optional<List<User>> searchUsersNotInProject(Integer idP,String username, String fullName, String email, String phone);

    Optional<List<User>> searchUsersInProject(Integer idP,String username, String fullName, String email, String phone);




    String passwordRecover(PasswordRecover pr);
}
