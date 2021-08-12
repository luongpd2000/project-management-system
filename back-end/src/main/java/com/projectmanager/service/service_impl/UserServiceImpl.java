package com.projectmanager.service.service_impl;

import com.projectmanager.common.CustomUserDetails;
import com.projectmanager.entity.User;
import com.projectmanager.repository.UserRepository;
import com.projectmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional(rollbackFor = Exception.class)
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User u = userRepository.findByUsername(username);
        if(u == null) {
            throw new UsernameNotFoundException("User not found for username: " + username);
        }
        return new CustomUserDetails(u);
    }

    @Override
    public User createUser(User u) {
        u.setEncryptedPassword(bCryptPasswordEncoder.encode(u.getPassword()));
        u.setAdmin(false);
        u.setDelete(false);
        u.setCreateDate(Date.valueOf(LocalDate.now()));
        return userRepository.save(u);
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }
}
